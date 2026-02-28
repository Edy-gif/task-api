const taskModel = require('../models/taskModel');

const getAllTasks = (req, res) => {
    taskModel.getAllTasks((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json(results);
    });
};

const getTaskById = (req, res) => {
    const id = req.params.id;
    taskModel.getTaskById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(results[0]);
    });
};

const getTasksByStatus = (req, res) => {
    const status = req.params.status;
    taskModel.getTasksByStatus(status, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No tasks found' });
        }
        res.status(200).json(results);
    });
};

const createTask = (req, res) => {
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
        return res.status(400).json({ message: 'Please provide title, description and status' });
    }
    taskModel.createTask(title, description, status, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Task created successfully!', id: results.insertId });
    });
};

const updateTask = (req, res) => {
    const id = req.params.id;
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
        return res.status(400).json({ message: 'Please provide title, description and status' });
    }
    taskModel.updateTask(id, title, description, status, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully!' });
    });
};

const deleteTask = (req, res) => {
    const id = req.params.id;
    taskModel.deleteTask(id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully!' });
    });
};

module.exports = { getAllTasks, getTaskById, getTasksByStatus, createTask, updateTask, deleteTask };