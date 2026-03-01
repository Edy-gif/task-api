const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';


const verifyAPIKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;

    if (!apiKey || apiKey !== 'my-secret-api-key') {
        return res.status(401).json({ message: 'Invalid or missing API key'})
    }

    next();
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({message: 'No token provided '});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Invalid token'});
    }
};

module.exports = {verifyAPIKey, verifyToken}; 