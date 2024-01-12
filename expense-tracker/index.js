const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true });

// Create Expense schema
const expenseSchema = new mongoose.Schema({
  category: String,
  description: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Expense', expenseSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/addExpense', (req, res) => {
  const { category, description, amount } = req.body;
  const newExpense = new Expense({ category, description, amount });

  newExpense.save((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.redirect('/');
    }
  });
});

app.get('/getExpenses', async (req, res) => {
  try {
    const expenses = await Expense.find().exec();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
