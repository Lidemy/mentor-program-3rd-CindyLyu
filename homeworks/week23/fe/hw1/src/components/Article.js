/* eslint-disable react/prop-types */

import React, { Component, Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import { getPost, putPost, deletePost } from '../WebAPI';


class BlogArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      isEdit: false,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const id = (history.location.pathname).replace('/post/', '');
    getPost(id)
      .then(response => this.setState({
        post: response.data,
      }));
  }

  handleEditSwitch = (type) => {
    const { post, isEdit } = this.state;
    if (type === 'cancel') {
      getPost(post.id)
        .then(response => this.setState({
          post: response.data,
        }));
    }
    this.setState({
      isEdit: !isEdit,
    });
  }

  handleDelete = () => {
    const { history } = this.props;
    const { post } = this.state;
    if (window.confirm('確定要刪除嗎')) {
      deletePost(post.id)
        .then(() => {
          alert('刪除成功');
          history.push('/post');
        })
        .catch((err) => {
          alert('刪除失敗，請稍後再試');
          console.log(err);
        });
    }
  }

  handleInputChange = (e) => {
    const { post } = this.state;
    const { value } = e.target;
    const { name } = e.target;
    this.setState({
      post: { ...post, [name]: value },
    });
  }

  handleEditSubmit = (e) => {
    e.preventDefault();
    const { post } = this.state;
    putPost(post.id, post.title, post.author, post.body)
      .catch((err) => {
        alert('更新失敗，請稍後再試');
        console.log(err);
      });
    // 看是否要改成新增成功才 setState，需研究要如何在 promise 裡 setState
    this.setState({
      isEdit: false,
    });
  }

  render() {
    const { post, isEdit } = this.state;
    return (
      <Fragment>
        <img className="blog__article-img" src="https://fakeimg.pl/1600x600/dbdbdb/?text=picture&font=bebas" alt="substitute" />
        <section className="blog__article">
          <div className="blog__article-action">
            { isEdit
              ? <a className="blog__article-canceledit" onClick={() => this.handleEditSwitch('cancel')}>取消編輯</a>
              : (
                <div>
                  <button className="blog__article-edit" onClick={this.handleEditSwitch}>
                    <i className="far fa-edit" />
                    編輯
                  </button>
                  <button className="blog__article-delete" onClick={this.handleDelete}>
                    <i className="far fa-trash-alt" />
                    刪除
                  </button>
                </div>
              )
            }
          </div>
          { isEdit ? (
            <div>
              標題：
              <input className="blog__article-edittitle" name="title" value={post.title} onChange={this.handleInputChange} />
            </div>
          ) : <div className="blog__article-title">{post.title ? post.title : 'Loading...'}</div> }
          { isEdit ? (
            <div>
              作者：
              <input className="blog__article-editauthor" name="author" value={post.author} onChange={this.handleInputChange} />
            </div>
          ) : (
            <div className="blog__article-author">
              <i className="fas fa-user" />
              {post.author ? post.author : '匿名'}
            </div>
          ) }
          { isEdit ? (
            <div>
              內容：
              <textarea className="blog__article-editbody" name="body" value={post.body} onChange={this.handleInputChange} />
            </div>
          ) : <div className="blog__article-body"><ReactMarkdown source={post.body} /></div> }
          { isEdit ? <button className="blog__article-editsubmit" type="submit" onClick={this.handleEditSubmit}>送出</button> : null }
        </section>
      </Fragment>
    );
  }
}


export default withRouter(BlogArticle);
