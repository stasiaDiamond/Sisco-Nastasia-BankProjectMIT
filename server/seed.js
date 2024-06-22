const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  // Initial user data
  const initialUsers = [
    { name: 'Sprinkles', email: 'sp@fb.com', password: 'secret', balance: 1000 },
    { name: 'Furby Baby', email: 'fb@fb.com', password: 'secret', balance: 150 },
  ];

  // Clear existing users
  await User.deleteMany({});

  // Insert initial users
  await User.insertMany(initialUsers);
  console.log('Initial users inserted');

  mongoose.connection.close();
});
