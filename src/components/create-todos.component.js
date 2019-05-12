import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todo_description: "",
            todo_responsible: "",
            todo_priority: "",
            todo_completed: false,
        }
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this)
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this)
        this.onChangepriority = this.onChangepriority.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChangeTodoDescription(e) {
        this.setState({ todo_description: e.target.value })
    }
    onChangeTodoResponsible(e) {
        this.setState({ todo_responsible: e.target.value })
    }
    onChangepriority(e) {
        this.setState({ todo_priority: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault();

        console.log(`todo Description: ${this.state.todo_description}`);
        console.log(`todo Responsible: ${this.state.todo_responsible}`);
        console.log(`todo Priority: ${this.state.todo_priority}`);
        console.log(`todo completed: ${this.state.todo_completed}`);


        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }
        const url = "http://localhost:4000/todos/add"
        axios.post(url, newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo_description: "",
            todo_responsible: "",
            todo_priority: "",
            todo_completed: false,
        })
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="field">
                    <div className="control has-icons-left">
                        <label className="label">Description</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="todo Description"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                            />
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Responsible</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input"
                            placeholder="todo Responsible"
                            value={this.state.todo_responsible}
                            onChange={this.onChangeTodoResponsible} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Priority</label>
                    <div className="control">
                        <div className="select">
                            <select
                                value={this.state.todo_priority}
                                onChange={this.onChangepriority}
                            >
                                <option value="">Choose</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-success">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-text">Cancel</button>
                    </div>
                </div>
            </form>
        )
    }
}