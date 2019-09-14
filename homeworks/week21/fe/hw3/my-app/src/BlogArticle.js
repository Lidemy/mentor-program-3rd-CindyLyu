/* eslint-disable react/prop-types */

import React, { Component } from 'react';


class BlogArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
    };
  }

  componentDidMount() {
    const { data } = this.props;
    fetch('https://jsonplaceholder.typicode.com/posts', { method: 'get' })
      .then(response => response.json())
      .then((result) => {
        this.setState({
          post: result[data - 1],
        });
      });
  }

  render() {
    const { post } = this.state;
    return (
      <section className="blog__article">
        <div className="blog__article-title">{post.title}</div>
        <div className="blog__article-content">{post.body}</div>
      </section>

    );
  }
}


export default BlogArticle;
