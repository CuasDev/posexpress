const express = require('express');
const auth = require('../middleware/auth'); // Middleware to protect routes
const User = require('../models/User');
const router = express.Router();

// Get user profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send({ message: error.message });
  }
});

// Update user profile
router.put('/', auth, async (req, res) => {
    const { firstName, lastName, address, phoneNumber } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });  
    } 

    // Update user fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();
    res.json(user);
  } catch (error) {
   res.status(500).json({ message: error.message }); // Handle any errors that occur during the update process 
  }
});

module.exports = router;