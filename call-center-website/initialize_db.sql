CREATE TABLE IF NOT EXISTS Customers (
  id INTEGER PRIMARY KEY,
  name TEXT,
  contact TEXT
);

CREATE TABLE IF NOT EXISTS Agents (
  id INTEGER PRIMARY KEY,
  name TEXT,
  extension INTEGER
);

CREATE TABLE IF NOT EXISTS Calls (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  agent_id INTEGER,
  call_date TEXT,
  notes TEXT,
  FOREIGN KEY (customer_id) REFERENCES Customers(id),
  FOREIGN KEY (agent_id) REFERENCES Agents(id)
);
CREATE TABLE IF NOT EXISTS Agents (
  id INTEGER PRIMARY KEY,
  name TEXT,
  extension INTEGER
);
