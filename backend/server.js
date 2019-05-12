const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const MangoUrl = "mongodb://127.0.0.1:27017/todos";
const mongoose = require('mongoose')
const todoRoutes = express.Router()
let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json())

mongoose.connect(
    MangoUrl,
    { useNewUrlParser: true }
)
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection Successfully");

})




todoRoutes.route('/').get(function (req, res) {
    Todo
        .find(function (err, todos) {
            if (err) {
                console.log(err);
            } else {
                res.json(todos);
            }
        });
});

todoRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id
    Todo.findById(id, function (err, todos) {
        res.json(todos);
    })
})

todoRoutes.route('/add').post(function (req, res) {
    let todo = new Todo(req.body);
    console.log(req);
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'Todo added successfuly' });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed')
        })
})

todoRoutes.route('/update/:id').post(function (req, res) {
    Todo
        .findById(req.params.id, function name(err, todo) {
            if (!todo)
                res.status(404).send('data is not found')
            else
                todo.todo_description = req.body.todo_description;
                todo.todo_responsible = req.body.todo_responsible;
                todo.todo_priority = req.body.todo_priority;
                todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
                .catch(err => {
                    res.status(400).send("Update not possible")
                })
        })
})

app.use('/todos', todoRoutes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
})