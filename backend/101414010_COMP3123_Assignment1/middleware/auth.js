const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied, token missing or invalid format' });
    }

    const token = authHeader.split(' ')[1];  // Extract the token
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authenticate;
