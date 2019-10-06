/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';


class List extends Component {
  componentDidMount() {
    const { getPostList } = this.props;
    getPostList();
  }

  componentDidUpdate(prevProps) {
    const { isLoadingGetPostList, error } = this.props;
    if (prevProps.isLoadingGetPostList !== isLoadingGetPostList && !isLoadingGetPostList) {
      if (error) {
        alert('讀取資料失敗，請稍後再試');
      }
    }
  }

  render() {
    const { history, postList } = this.props;
    return (
      <Router>
        <img className="blog__list-img" src={require('../background-image.jpg')} alt="substitute" />
        <section className="blog__list">
          <div className="blog__list-title">
            <span className="fas fa-list-ul" />
              文章列表
          </div>
          {
            postList.map(item => (
              <div className="blog__list-body" key={item.id} onClick={() => { history.push(`/post/${item.id}`); }}>
                <div className="blog__list-body-title">{item.title}</div>
                <div className="blog__list-body-line" />
                <div className="blog__list-body-content">{item.body}</div>
                <div className="blog__list-readmore">Read more</div>
              </div>
            ))
          }
        </section>
      </Router>
    );
  }
}


export default List;
