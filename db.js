const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@2Enqwhbj1738',
    database: 'task_manager'
});

db.connect((err) => {
    if (err) {
        console.log('Database connection failed: ', err);
    } else {
        console.log('Connected to database!');
    }
});

module.exports = db;