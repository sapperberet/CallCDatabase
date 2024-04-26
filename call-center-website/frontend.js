document.addEventListener('DOMContentLoaded', () => {
    const customersTable = document.getElementById('customersTable').getElementsByTagName('tbody')[0];
  
    function fetchCustomers() {
      fetch('http://localhost:3000/customers')
        .then((response) => response.json())
        .then((customers) => {
          customersTable.innerHTML = '';
          customers.forEach((customer) => {
            const row = customersTable.insertRow();
            row.insertCell(0).innerText = customer.id;
            row.insertCell(1).innerText = customer.name;
            row.insertCell(2).innerText = customer.contact;
  
            const actionsCell = row.insertCell(3);
  
            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.onclick = () => {
              const newName = prompt('Enter new name', customer.name);
              const newContact = prompt('Enter new contact', customer.contact);
              if (newName && newContact) {
                fetch(`http://localhost:3000/customers/${customer.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: newName, contact: newContact }),
                }).then(() => fetchCustomers());
              }
            };
            actionsCell.appendChild(editButton);
  
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => {
              fetch(`http://localhost:3000/customers/${customer.id}`, {
                method: 'DELETE',
              }).then(() => fetchCustomers());
            };
            actionsCell.appendChild(deleteButton);
          });
        });
    }
  
    fetchCustomers(); 
  
    
    const addCustomerForm = document.getElementById('addCustomerForm');
    addCustomerForm.onsubmit = (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const contact = e.target.contact.value;
      fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact }),
      }).then(() => {
        fetchCustomers();
        addCustomerForm.reset();
      });
    };
  });
  