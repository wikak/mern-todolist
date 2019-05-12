const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    todo_description: String,
    todo_responsible: String,
    todo_priority: String,
    todo_completed: Boolean
})

module.exports = mongoose.model('Todo', Todo);