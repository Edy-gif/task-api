const express = require('express');
const app = express();

app.use(express.json());

const taskController = require('./controllers/taskController');

app.get('/api/tasks', taskController.getAllTasks);
app.get('/api/tasks/status/:status', taskController.getTasksByStatus);
app.get('/api/tasks/:id', taskController.getTaskById);
app.post('/api/tasks', taskController.createTask);
app.put('/api/tasks/:id', taskController.updateTask);
app.delete('/api/tasks/:id', taskController.deleteTask);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});