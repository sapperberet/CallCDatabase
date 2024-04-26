const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('call_center.db');


db.serialize(() => {
  const fs = require('fs');
  const script = fs.readFileSync('initialize_db.sql', 'utf8');
  db.exec(script);
});


app.get('/customers', (req, res) => {
  db.all('SELECT * FROM Customers', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/customers', (req, res) => {
  const { name, contact } = req.body;
  db.run(
    'INSERT INTO Customers (name, contact) VALUES (?, ?)',
    [name, contact],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.put('/customers/:id', (req, res) => {
  const { name, contact } = req.body;
  db.run(
    'UPDATE Customers SET name = ?, contact = ? WHERE id = ?',
    [name, contact, req.params.id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ updated: this.changes > 0 });
    }
  );
});

app.delete('/customers/:id', (req, res) => {
  db.run(
    'DELETE FROM Customers WHERE id = ?',
    [req.params.id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ deleted: this.changes > 0 });
    }
  );
});
// CRUD endpoints for Agents
app.get('/agents', (req, res) => {
    db.all('SELECT * FROM Agents', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });
  
  app.post('/agents', (req, res) => {
    const { name, extension } = req.body;
    db.run('INSERT INTO Agents (name, extension) VALUES (?, ?)', [name, extension], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({ id: this.lastID });
    });
  });
  
  app.put('/agents/:id', (req, res) => {
    const { name, extension } = req.body;
    db.run('UPDATE Agents SET name = ?, extension = ? WHERE id = ?', [name, extension, req.params.id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ updated: this.changes > 0 });
    });
  });
  
  app.delete('/agents/:id', (req, res) => {
    db.run('DELETE FROM Agents WHERE id = ?', [req.params.id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ deleted: this.changes > 0 });
    });
  });
  
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
