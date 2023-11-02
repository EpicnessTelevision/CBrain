// controllers/userController.js

// Sample array to simulate a database
const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
  ];
  
  // Get all users
  const getAllUsers = (req, res) => {
    res.json(users);
  };
  
  // Get a user by ID
  const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    res.json(user);
  };
  
  // Create a new user
  const createUser = (req, res) => {
    const { name } = req.body;
    const id = users.length + 1;
    const newUser = { id, name };
  
    users.push(newUser);
  
    res.status(201).json(newUser);
  };
  
  // Update a user by ID
  const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    user.name = req.body.name;
    res.json(user);
  };
  
  // Delete a user by ID
  const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
  
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted' });
  };
  
  module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
  