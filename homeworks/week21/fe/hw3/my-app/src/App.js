/* eslint-disable no-underscore-dangle */

import React, { Component } from 'react';
import './index.sass';
import BlogList from './BlogList';
import BlogArticle from './BlogArticle';
import BlogAbout from './BlogAbout';


function onChangePage(page) {
  window.location.hash = page;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: window.location.hash || '#list',
      id: '',
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', this._onHashChange);
  }

  _onHashChange = () => {
    this.setState({
      active: window.location.hash,
    });
  }

  handleToArticle = (data) => {
    this.setState({
      id: data.id || '',
    });
    onChangePage(data.active);
  }

  render() {
    const { active, id } = this.state;
    return (
      <main className="blog">
        <nav className="blog__nav">
          <item className="blog__nav-name">Blog</item>
          <item className="blog__nav-list" value="list" onClick={() => { onChangePage('list'); }}>List</item>
          <item className="blog__nav-about" onClick={() => { onChangePage('about'); }}>About</item>
        </nav>
        {active === '#list'? <BlogList toArticle={this.handleToArticle} /> : null}
        {active === '#article' ? <BlogArticle data={id} /> : null}
        {active === '#about' ? <BlogAbout /> : null}
      </main>
    );
  }
}


export default App;
