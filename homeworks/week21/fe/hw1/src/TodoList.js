/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-env jquery */

import React, { Component } from 'react';


class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: true,
      content: '',
    };
  }

  _editTodo(e) {
    this.setState({
      content: e.target.value,
    });
  }

  handleDeleteTodo(e) {
    const { onDeleteTodo } = this.props;
    onDeleteTodo({
      id: e.target.parentNode.id,
    });
  }

  handleEdit(e) {
    this.setState({
      index: Number(e.target.parentNode.id),
    });
  }

  handleSubmitEdit(e) {
    const { onUpdateTodo } = this.props;
    const { content } = this.state;
    if (e.keyCode === 13) {
      onUpdateTodo({
        content,
        id: Number(e.target.parentNode.id),
        isComplete: !$(e.target).parent('.list-group-item').find('.fa-square')[0],
      });
      this.setState({
        index: '',
        content: '',
      });
    }
  }

  handleIsComplete(e) {
    const { onChangeIsComplete } = this.props;
    onChangeIsComplete({
      isComplete: !$(e.target).hasClass('fa-square'),
      id: Number(e.target.parentNode.id),
    });
  }

  render() {
    const { data } = this.props;
    const { index, content } = this.state;
    return (
      <section className="todolist__content">
        {
          data.map(item => (
            <div className="list-group-item list-group-item-action" id={item.id} key={item.id}>
              {
              item.isComplete
                ? <option className="far fa-check-square" onClick={this.handleIsComplete.bind(this)} />
                : <option className="far fa-square" onClick={this.handleIsComplete.bind(this)} />
             }
              {
                item.id === index
                  ? <input className="todolist__content-edit" value={content || item.content} onChange={this._editTodo.bind(this)} onKeyDown={this.handleSubmitEdit.bind(this)} />
                  : <span className="todolist__content-item">{item.content}</span>
              }
              {
                item.id === index
                  ? (
                    <span>
                      <span className="todolist__content-message"> （編輯後按 enter 送出）</span>
                      <button type="button" className="btn btn-link" onClick={this.handleEdit.bind(this)}>取消編輯</button>
                    </span>
                  )
                  : <option className="fas fa-pen" onClick={this.handleEdit.bind(this)} />
              }
              <option className="fas fa-times" onClick={this.handleDeleteTodo.bind(this)} />
            </div>
          ))
        }
      </section>
    );
  }
}


export default TodoList;
