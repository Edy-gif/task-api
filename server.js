const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const { verifyAPIKey, verifyToken } = require('./authMiddleware');
const { register, login } = require('./controllers/authController');
const taskController = require('./controllers/taskController');
const taskViewController = require('./controllers/taskViewController');

const app = express();

// Security
app.use(helmet({ contentSecurityPolicy: false }));
app.disable('x-powered-by');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// Flash messages
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Web routes
app.get('/', (req, res) => res.render('index'));
app.get('/tasks', taskViewController.getAllTasks);
app.get('/tasks/new', taskViewController.newTaskForm);
app.post('/tasks', taskViewController.createTask);
app.get('/tasks/:id/edit', taskViewController.editTaskForm);
app.post('/tasks/:id/update', taskViewController.updateTask);
app.post('/tasks/:id/delete', taskViewController.deleteTask);
app.get('/friday', taskViewController.fridayPage);

// API routes
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