/* eslint-disable react/prop-types */

import React, { Component } from 'react';


class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts', { method: 'get' })
      .then(response => response.json())
      .then((data) => {
        this.setState({
          post: data,
        });
      });
  }

  handleToArticle = (e) => {
    const { toArticle } = this.props;
    toArticle({
      active: 'article',
      id: e.target.getAttribute('id'),
    });
  }


  render() {
    const { post } = this.state;
    return (
      <section className="blog__list">
        <div className="blog__list-title">
          <span className="fas fa-list-ul" />
            文章列表
        </div>
        {
          post.map(item => <option className="blog__list-aritcle" key={item.id} id={item.id} onClick={this.handleToArticle}>{item.title}</option>)
        }
      </section>
    );
  }
}

export default BlogList;
