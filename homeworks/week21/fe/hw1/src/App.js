/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import './style.css';
import TodoInput from './TodoInput';
import ProcessBar from './ProcessBar';
import TodoList from './TodoList';

function handlePercentage(todos) {
  let completeItem = 0;
  for (let i = 0; i < todos.length; i += 1) {
    if (todos[i].isComplete === true) {
      completeItem += 1;
    }
  }
  const totalItem = todos.length;
  const completePercentage = Math.round((completeItem / totalItem) * 100);
  return completePercentage;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ content: '跟貓玩', id: 1, isComplete: false }, { content: '寫作業', id: 2, isComplete: false }],
    };
  }

  handleSubmitTodo(todo) {
    const { todos } = this.state;
    todos.push(todo);
    const percentage = handlePercentage(todos);
    this.setState({
      todos,
      percentage,
    });
  }

  handleUpdateTodo(data) {
    const { id } = data;
    const { todos } = this.state;
    const newTodos = todos.filter(item => item.id !== Number(id));
    const percentage = handlePercentage(todos);
    this.setState({
      todos: [...newTodos, data],
      percentage,
    });
  }

  handleDeleteTodo(data) {
    const { todos } = this.state;
    const newTodos = todos.filter(item => item.id !== Number(data.id)); // 省列大括號及 return
    const percentage = handlePercentage(newTodos);
    this.setState({
      todos: newTodos,
      percentage,
    });
  }

  handleIsComplete(data) {
    const { id } = data;
    const { todos } = this.state;
    const todoItem = todos.filter(item => item.id === Number(id));
    todoItem[0].isComplete = !todoItem[0].isComplete; // 指向同個記憶體
    const percentage = handlePercentage(todos);
    this.setState({
      todos,
      percentage,
    });
  }

  render() {
    const { todos, percentage } = this.state;
    return (
      <main className="todolist">
        <TodoInput onSubmit={this.handleSubmitTodo.bind(this)} />
        <ProcessBar data={percentage} />
        <TodoList
          data={todos}
          onUpdateTodo={this.handleUpdateTodo.bind(this)}
          onDeleteTodo={this.handleDeleteTodo.bind(this)}
          onChangeIsComplete={this.handleIsComplete.bind(this)}
        />
      </main>
    );
  }
}


export default App;
