const taskModel = require('../models/taskModel');

const getAllTasks = (req, res) => {
    taskModel.getAllTasks((err, tasks) => {
        if (err) {
            req.flash('error', 'Failed to load tasks');
            return res.redirect('/');
        }
        res.render('tasks/index', { tasks });
    });
};

const newTaskForm = (req, res) => {
    res.render('tasks/new');
};

const createTask = (req, res) => {
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
        req.flash('error', 'Please provide all fields');
        return res.redirect('/tasks/new');
    }
    taskModel.createTask(title, description, status, (err) => {
        if (err) {
            req.flash('error', 'Failed to create task');
            return res.redirect('/tasks/new');
        }
        req.flash('success', 'Task created successfully!');
        res.redirect('/tasks');
    });
};

const editTaskForm = (req, res) => {
    const id = req.params.id;
    taskModel.getTaskById(id, (err, results) => {
        if (err || results.length === 0) {
            req.flash('error', 'Task not found');
            return res.redirect('/tasks');
        }
        res.render('tasks/edit', { task: results[0] });
    });
};

const updateTask = (req, res) => {
    const id = req.params.id;
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
        req.flash('error', 'Please provide all fields');
        return res.redirect(`/tasks/${id}/edit`);
    }
    taskModel.updateTask(id, title, description, status, (err) => {
        if (err) {
            req.flash('error', 'Failed to update task');
            return res.redirect(`/tasks/${id}/edit`);
        }
        req.flash('success', 'Task updated successfully!');
        res.redirect('/tasks');
    });
};

const deleteTask = (req, res) => {
    const id = req.params.id;
    taskModel.deleteTask(id, (err) => {
        if (err) {
            req.flash('error', 'Failed to delete task');
            return res.redirect('/tasks');
        }
        req.flash('success', 'Task deleted successfully!');
        res.redirect('/tasks');
    });
};

const fridayPage = (req, res) => {
    const dateParam = req.query.date;
    const today = dateParam ? new Date(dateParam) : new Date();
    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    const isFriday = today.getDay() === 5;
    res.render('friday', { dayOfWeek, isFriday, date: today.toDateString() });
};

module.exports = { getAllTasks, newTaskForm, createTask, editTaskForm, updateTask, deleteTask, fridayPage };