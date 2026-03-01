const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = 'your-secret-key';

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide username and password' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(sql, [username, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }
            res.status(201).json({ message: 'User registered successfully!' });
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide username and password' });
        }

        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful!', token });
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
};

module.exports = { register, login };