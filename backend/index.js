import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [{ id: 1, title: "Task 1", completed: false }];

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
    res.status(201).json(newTask);
}); 

app.listen(3000, () => console.log('Server running on http://localhost:3000'));