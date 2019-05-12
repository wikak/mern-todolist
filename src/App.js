import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTodo from './components/create-todos.component'
import TodosList from './components/todos-list.component'
import EditTodo from './components/edit-todos.component'
import logo from './logo.svg'
import 'bulma/css/bulma.css'
import './App.css'
class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src={logo} width="54px" height="54px" alt="mern" />
            </a>
            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">Todos</Link>
              <Link to="/create" className="navbar-item">Create Todos</Link>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">
                  Log in
                        </a>
              </div>
            </div>
          </div>
        </nav>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-three-quarters">
                <Route path="/" exact component={TodosList} />
                <Route path="/edit/:id" exact component={EditTodo} />
                <Route path="/create" exact component={CreateTodo} />
              </div>
              <div className="column"></div>
              <div className="column"></div>
            </div>

          </div>
        </section>
      </Router >
    )
  }

}

export default App;
