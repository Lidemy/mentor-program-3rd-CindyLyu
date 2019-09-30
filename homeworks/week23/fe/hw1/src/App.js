import React, { Component } from 'react';
import './index.sass';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import List from './components/List';
import Article from './components/Article';
import About from './components/About';
import AddArticle from './components/AddPost';
import { changePage } from './actions';


class App extends Component {
  handleChangePage = (pageText) => {
    this.props.updatePage(pageText);
  }

  render() {
    const { page } = this.props;
    return (
      <Router basename="Blog-SPA">
        <main className="blog">
          <nav className="blog__nav">
            <div className="blog__nav-name" onClick={() => this.handleChangePage('home')}>LYU</div>
            <div className="blog__nav-about" onClick={() => this.handleChangePage('about')}>About</div>
            <div className="blog__nav-list" onClick={() => this.handleChangePage('list')}>List</div>
            <div className="blog__nav-addpost" onClick={() => this.handleChangePage('addPost')}>Add Post</div>
          </nav>
          <Route exact path="/" component={List} />
          <Route exact path="/post" component={List} />
          <Route path="/about" component={About} />
          <Route
            path="/post/:postId"
            render={() => <Article updataState={this.updateState} />}
          />
          <Route path="/addpost" component={AddArticle} />
          { page === 'home' ? <Redirect to="/" /> : null }
          { page === 'list' ? <Redirect to="/post" /> : null }
          { page === 'about' ? <Redirect to="/about" /> : null }
          { page === 'addPost' ? <Redirect to="/addpost" /> : null }
        </main>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  page: state.page,
});

const mapDispatchToProps = dispatch => ({
  updatePage: pageText => dispatch(changePage(pageText)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
