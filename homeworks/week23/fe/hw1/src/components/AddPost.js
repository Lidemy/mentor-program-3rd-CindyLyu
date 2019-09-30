import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { addPost } from '../WebAPI';


class BlogAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      body: '',
    };
  }

  handleInputChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { title, author, body } = this.state;
    addPost(title, author, body)
      .then(() => {
        alert('新增成功');
        history.push('/post');
      })
      .catch((err) => {
        alert('新增失敗，請稍後再試');
        console.log(err);
      });
  }

  render() {
    const { title, author, body } = this.state;
    return (
      <Fragment>
        <form className="blog__addpost" method="POST">
          <div className="blog__addpost-title">
            <i className="far fa-plus-square" />
              新增文章
          </div>
          <div>
            標題：
            <input className="blog__addpost-articletitle" placeholder="輸入文章標題" name="title" value={title} onChange={this.handleInputChange} />
          </div>
          <div>
            作者：
            <input className="blog__addpost-author" placeholder="輸入你的大名" name="author" value={author} onChange={this.handleInputChange} />
          </div>
          <div>
            內容：
            <textarea className="blog__addpost-body" placeholder="文章內容" name="body" value={body} onChange={this.handleInputChange} />
          </div>
          <br />
          <button className="blog__addpost-submit" type="submit" onClick={this.handleSubmit}>送出</button>
        </form>
      </Fragment>
    );
  }
}


export default withRouter(BlogAbout);
