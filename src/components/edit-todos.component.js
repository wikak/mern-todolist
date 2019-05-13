import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { cpus } from 'os';
export default class EditTodo extends Component {

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

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const url = "http://localhost:4000/todos/update/" + this.props.match.params.id
        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }
        axios.post(url, obj)
            .then(response => {
                this.setState({
                    todos: response.data
                })
            })
            .catch(function (err) {
                console.log(err);
            })

        this.props.history.push('/')
    }
    componentDidMount() {
        const url = "http://localhost:4000/todos/" + this.props.match.params.id
        axios.get(url)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed,

                })
            })
            .catch(err => { console.log(err) })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="modal is-active">
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <h2 className="modal-card-title">Update Todo</h2>
                                <button className="delete" aria-label="close"></button>
                            </header>
                            <section className="modal-card-body">
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
                                <div className="field">
                                    <label className="checkbox">
                                        <input type="checkbox"
                                            onChange={this.onChangeTodoCompleted}
                                            checked={this.state.todo_completed}
                                        />
                                        Completed
                                    </label>
                                </div>
                            </section>
                            <footer className="modal-card-foot">
                                <button className="button is-success">Save changes</button>
                                <button className="button">Cancel</button>
                            </footer>
                        </div>
                    </div>
                </form>
            </div >
        )
    }
}