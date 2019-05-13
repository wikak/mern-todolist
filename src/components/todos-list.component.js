import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Todo = props => {
    return (
        <tr className= {props.todo.todo_completed === true ? "is-selected" : ""  }>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </td>
        </tr >
    )
}

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] }
        //this.todoList = this.todoList.bind(this);
    }

    componentDidMount() {
        const url = "http://localhost:4000/todos"
        axios.get(url)
            .then(response => {
                this.setState({
                    todos: response.data
                })
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    todoList() {

        return this.state.todos.map(function (currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />
        })
    }
    render() {
        return (
            <div>
                <h2>Todos List</h2>
                <table className="table is-hoverable">
                    <thead>
                        <tr>
                            <th><abbr title="Description">Description</abbr></th>
                            <th>Responsible</th>
                            <th><abbr title="Priority">Priority</abbr></th>
                            <th><abbr title="Actions">Actions</abbr></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}