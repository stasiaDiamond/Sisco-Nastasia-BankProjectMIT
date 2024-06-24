const express = require('express');
const cors = require('cors');
const path = require('path');
const dal = require('./dal');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://sisco-nastasia-bad-bank-432958bada4b.herokuapp.com'],
  credentials: true
}));

// Middleware to disable caching
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Root route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.post('/api/create-account', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await dal.create(name, email, password);
    res.send(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await dal.findUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).send('Invalid credentials');
    }
    res.send(user);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});

app.post('/api/deposit', async (req, res) => {
  try {
    const { email, amount } = req.body;
    const user = await dal.deposit(email, amount);
    res.send(user);
  } catch (error) {
    console.error('Error depositing:', error);
    res.status(500).send('Error depositing');
  }
});

app.post('/api/withdraw', async (req, res) => {
  try {
    const { email, amount } = req.body;
    const user = await dal.withdraw(email, amount);
    res.send(user);
  } catch (error) {
    console.error('Error withdrawing:', error);
    res.status(500).send('Error withdrawing');
  }
});

app.get('/account/all', async (req, res) => {
  try {
    const users = await dal.all();
    res.send(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Error retrieving users');
  }
});

// catchall handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
