/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      isComplete: 0,
    };
    this.id = 2;
  }

  handleChange(e) {
    this.setState({
      content: e.target.value,
    });
  }

  handleAddTodo() {
    const { onSubmit } = this.props;
    const { content, isComplete } = this.state;
    onSubmit({
      content,
      isComplete,
      id: this.id += 1,
    });
    this.setState({
      content: '',
    });
  }

  render() {
    const { content } = this.state;
    return (
      <div>
        <header className="todolist__title">ToDoList</header>
        <div className="todolist__additem">
          <input className="todolist__additem-input" placeholder="What needs to be done?" value={content} onChange={this.handleChange.bind(this)} />
          <button className="todolist__additem-add" onClick={this.handleAddTodo.bind(this)} type="button">新增</button>
        </div>
      </div>
    );
  }
}


export default TodoInput;
