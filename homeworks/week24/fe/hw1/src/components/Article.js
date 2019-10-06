/* eslint-disable react/prop-types */

import React, { Component, Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';


class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      isEdit: false,
    };
  }

  componentDidMount() {
    const { match, post, getPost } = this.props;
    const id = match.params.postId;
    getPost(id);
    this.setState({
      post,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      history, error, isLoadingDeletePost, isLoadingUpdatePost, post,
    } = this.props;
    if (prevProps.post !== post) {
      this.setState({
        post,
      });
    }
    if (prevProps.isLoadingDeletePost !== isLoadingDeletePost && !isLoadingDeletePost) {
      if (error) {
        alert('刪除失敗，請稍後再試');
      } else {
        history.push('/post');
        alert('刪除成功');
      }
    }
    if (prevProps.isLoadingUpdatePost !== isLoadingUpdatePost && !isLoadingUpdatePost) {
      if (error) {
        alert('更新失敗，請稍後再試');
      } else {
        this.setState({
          isEdit: false,
        });
      }
    }
  }

  handleEditSwitch = (type) => {
    const { isEdit } = this.state;
    const { post, getPost } = this.props;
    getPost(post.id); // dispatch 讓 post 資料更新
    if (type === 'cancel') {
      this.setState({
        post,
      });
    }
    this.setState({
      isEdit: !isEdit,
    });
  }

  handleDelete = () => {
    const { post, deletePost } = this.props;
    if (window.confirm('確定要刪除嗎')) {
      deletePost(post.id);
    }
  }

  handleInputChange = (e) => {
    const { post } = this.state;
    const { value, name } = e.target;
    this.setState({
      post: { ...post, [name]: value },
    });
  }

  handleEditSubmit = (e) => {
    e.preventDefault();
    const { post } = this.state;
    const { updatePost } = this.props;
    updatePost(post.id, post.title, post.author, post.body);
  }

  render() {
    const { isEdit, post } = this.state;
    return (
      <Fragment>
        <img className="blog__article-img" src="https://fakeimg.pl/1600x600/dbdbdb/?text=picture&font=bebas" alt="substitute" />
        <section className="blog__article">
          <div className="blog__article-action">
            { isEdit
              ? <button className="blog__article-canceledit" onClick={() => this.handleEditSwitch('cancel')}>取消編輯</button>
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
          { isEdit
            ? (
              <Fragment>
                <div>
                標題：
                  <input className="blog__article-edittitle" name="title" value={post.title} onChange={this.handleInputChange} />
                </div>
                <div>
                作者：
                  <input className="blog__article-editauthor" name="author" value={post.author} onChange={this.handleInputChange} />
                </div>
                <div>
                內容：
                  <textarea className="blog__article-editbody" name="body" value={post.body} onChange={this.handleInputChange} />
                </div>
                <button className="blog__article-editsubmit" type="submit" onClick={this.handleEditSubmit}>送出</button>
              </Fragment>
            )
            : (
              <Fragment>
                <div className="blog__article-title">{ post.title ? post.title : 'Loading...' }</div>
                <div className="blog__article-author">
                  <i className="fas fa-user" />
                  {post.author ? post.author : '匿名'}
                </div>
                <div className="blog__article-body">
                  <ReactMarkdown source={post.body} renderers={{ code: CodeBlock }} />
                </div>
              </Fragment>
            )
          }
        </section>
      </Fragment>
    );
  }
}


export default Article;
