/* eslint-disable react/prop-types */

import React, { Component, Fragment } from 'react';
import ReactMarkdown from 'react-markdown'
const axios = require('axios');


class BlogArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
    };
  }

  componentDidMount() {
    const id = this.props.match.params.postId;
    axios.get(`https://qootest.com/posts/${id}`)
      .then(response => 
        this.setState({
          post: response.data
        })
      )
  }

  render() {
    const { post } = this.state;
    return (
      <Fragment>
        <img className='blog__article-img' src="https://fakeimg.pl/1600x600/dbdbdb/?text=picture&font=bebas" />
        <section className="blog__article">
          <div className="blog__article-title">{post.title ? post.title : 'Loading...'}</div>
          <div className="blog__article-author"><i className="fas fa-user"></i>{post.author ? post.author : '匿名'}</div>
          <div className="blog__article-content"><ReactMarkdown source={post.body} /></div>
        </section>
      </Fragment>
    );
  }
}


export default BlogArticle;
