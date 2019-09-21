/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { BrowserRouter as Router, withRouter } from "react-router-dom";
const axios = require('axios');


class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
    };
  }

  componentDidMount() {
    axios.get('https://qootest.com/posts')
      .then(response => 
        this.setState({
          post: response.data
        })
      )
  }

  render() {
    const { post } = this.state;
    const { history } = this.props;
    return (
      <Router>
        <img className='blog__list-img' src={require('./background-image.jpg')} />
        <section className="blog__list">
          <div className="blog__list-title">
            <span className="fas fa-list-ul" />
              文章列表
          </div>
            {
              post.map(item => 
                <div className='blog__list-body' key={item.id} onClick={() => {history.push('/post/' + item.id)}}>
                  <div className="blog__list-body-title">{item.title}</div>
                  <div className='blog__list-body-line'></div>
                  <div className='blog__list-body-content'>{item.body}</div>
                  <div className='blog__list-readmore'>Read more</div>
                </div>
              )
            }
        </section>
      </Router>
    );
  }
}


export default withRouter(BlogList);
