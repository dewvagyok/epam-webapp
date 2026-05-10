import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = './tasks.json';

const loadTasks = () => {
    try {
        if (fs.existsSync(FILE_PATH)) {
            const data = fs.readFileSync(FILE_PATH, 'utf-8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Error loading tasks:', err);
    }
    return [{ id: 1, title: 'Sample Task', completed: false }];
};

const saveTasks = (tasks) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
};

let tasks = loadTasks();

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    console.log("Received new task:", req.body);
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
}); 

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id !== parseInt(id));
    saveTasks(tasks);
    res.status(204).send();
});

app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === parseInt(id));
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        res.json(task);
    } else {
        res.status(404).send();
    }
});

export default app;

if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
}