const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user'); // Ensure this path is correct

const url = process.env.MONGODB_URI;

if (!url) {
  console.error('MONGODB_URI is not defined. Please check your .env file.');
  process.exit(1);
}

mongoose.connect(url, {
  // No options are needed here as these options are deprecated
});

let db = mongoose.connection;

db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

async function create(name, email, password) {
  try {
    const user = new User({ name, email, password, balance: 0 });
    await user.save();
    return user;
  } catch (err) {
    console.error('Create user failed', err); // Detailed error logging
    throw err;
  }
}

async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    console.error('Finding user by email failed', err);
    throw err;
  }
}

async function deposit(email, amount) {
  try {
    const user = await User.findOne({ email });
    user.balance += amount;
    await user.save();
    return user;
  } catch (err) {
    console.error('Deposit failed', err);
    throw err;
  }
}

async function withdraw(email, amount) {
  try {
    const user = await User.findOne({ email });
    if (user.balance < amount) {
      throw new Error('Insufficient funds');
    }
    user.balance -= amount;
    await user.save();
    return user;
  } catch (err) {
    console.error('Withdrawal failed', err);
    throw err;
  }
}

async function all() {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    console.error('Fetching all users failed', err);
    throw err;
  }
}

module.exports = { create, findUserByEmail, deposit, withdraw, all };
