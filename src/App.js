import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTodo from './components/create-todos.component'
import TodosList from './components/todos-list.component'
import EditTodo from './components/edit-todos.component'
import 'bulma/css/bulma.css'

class App extends Component {
  render() {
    return (
      <Router>
        <section class="hero is-warning">
          <div class="hero-body">
            <div class="container">
              <div class="columns">
                <div class="column">
                  <h1 class="title">
                    MEARN - STACK
                    </h1>
                </div>
                <div class="column">
                  <Route path="/" exact component={TodosList} />
                  <Route path="/edit/:id" exact component={EditTodo} />
                  <Route path="/create" exact component={CreateTodo} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Router>
    )
  }

}

export default App;
