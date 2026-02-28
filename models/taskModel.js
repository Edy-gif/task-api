const db = require('../db');

const getAllTasks = (callback) => {
    const sql = 'SELECT * FROM task';
    db.query(sql, callback);
};

const getTaskById = (id, callback) => {
    const sql = 'SELECT * FROM task WHERE id = ?';
    db.query(sql, [id], callback);
};

const getTasksByStatus = (status, callback) => {
    const sql = 'SELECT * FROM task WHERE status = ?';
    db.query(sql, [status], callback);
};

const createTask = (title, description, status, callback) => {
    const sql = 'INSERT INTO task (title, description, status) VALUES (?, ?, ?)';
    db.query(sql, [title, description, status], callback);
};

const updateTask = (id, title, description, status, callback) => {
    const sql = 'UPDATE task SET title = ?, description = ?, status = ? WHERE id = ?';
    db.query(sql, [title, description, status, id], callback);
};

const deleteTask = (id, callback) => {
    const sql = 'DELETE FROM task WHERE id = ?';
    db.query(sql, [id], callback);
};

module.exports = { getAllTasks, getTaskById, getTasksByStatus, createTask, updateTask, deleteTask };