document.addEventListener('DOMContentLoaded', () => {
    const agentsTable = document.getElementById('agentsTable').getElementsByTagName('tbody')[0];
  
    function loadAgents() {
      fetch('http://localhost:3000/agents')
        .then((response) => response.json())
        .then((data) => {
          agentsTable.innerHTML = '';
          data.forEach((agent) => {
            const row = agentsTable.insertRow();
            row.insertCell(0).innerText = agent.id;
            row.insertCell(1).innerText = agent.name;
            row.insertCell(2).innerText = agent.extension;
  
            const actionsCell = row.insertCell(3);
  
            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.onclick = () => {
              const newName = prompt('Enter new name', agent.name);
              const newExtension = prompt('Enter new extension', agent.extension);
              if (newName && newExtension) {
                fetch(`http://localhost:3000/agents/${agent.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: newName, extension: newExtension }),
                }).then(() => loadAgents());
              }
            };
            actionsCell.appendChild(editButton);
  
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => {
              fetch(`http://localhost:3000/agents/${agent.id}`, {
                method: 'DELETE',
              }).then(() => loadAgents());
            };
            actionsCell.appendChild(deleteButton);
          });
        });
    }

    loadAgents();

    const addAgentForm = document.getElementById('addAgentForm');
    addAgentForm.onsubmit = (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const extension = e.target.extension.value;
      fetch('http://localhost:3000/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, extension }),
      }).then(() => {
        loadAgents();
        addAgentForm.reset();
      });
    };
  });
