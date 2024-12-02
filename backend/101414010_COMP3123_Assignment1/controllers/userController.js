const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

// Signup: Register a new user and generate a JWT token
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) return res.status(400).json({ error: 'Email already in use' });

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        /*const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' }); */

        // Send response with token
        res.status(201).json({ message: 'User created successfully' }); // I used token here earlier
    } catch (error) {
        res.status(500).json({ error: error.message || 'Signup failed' });
    }
};

// Login: Authenticate user and generate JWT token
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Ensure correct comparison by trimming any excess spaces
        const isMatch = await bcrypt.compare(password.trim(), user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successfully', token });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Login failed' });
    }
};
