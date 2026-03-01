const express = require('express');
const helmet = require('helmet');
const { verifyAPIKey, verifyToken } = require('./authMiddleware');
const { register, login } = require('./controllers/authController');

const app = express();

app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');

const taskController = require('./controllers/taskController');

app.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});

app.post('/register', register);
app.post('/login', login);

app.get('/api/tasks', verifyAPIKey, taskController.getAllTasks);
app.get('/api/tasks/status/:status', taskController.getTasksByStatus);
app.get('/api/tasks/:id', taskController.getTaskById);
app.post('/api/tasks', taskController.createTask);
app.put('/api/tasks/:id', taskController.updateTask);
app.delete('/api/tasks/:id', taskController.deleteTask);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});