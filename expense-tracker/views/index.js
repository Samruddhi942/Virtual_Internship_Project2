document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
  
    expenseForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const category = document.getElementById('category').value;
      const description = document.getElementById('description').value;
      const amount = document.getElementById('amount').value;
  
      const response = await fetch('/addExpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `category=${category}&description=${description}&amount=${amount}`,
      });
  
      if (response.ok) {
        loadExpenses();
        expenseForm.reset();
      } else {
        console.error('Failed to add expense');
      }
    });
  
    async function loadExpenses() {
      const response = await fetch('/getExpenses');
      const expenses = await response.json();
  
      expenseList.innerHTML = '';
      expenses.forEach((expense) => {
        const expenseItem = document.createElement('div');
        expenseItem.innerHTML = `
          <p><strong>Category:</strong> ${expense.category}</p>
          <p><strong>Description:</strong> ${expense.description}</p>
          <p><strong>Amount:</strong> $${expense.amount.toFixed(2)}</p>
          <hr>
        `;
        expenseList.appendChild(expenseItem);
      });
    }
  
    loadExpenses();
  });
  