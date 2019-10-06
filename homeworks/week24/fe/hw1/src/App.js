import React, { Component } from 'react';
import './index.sass';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import List from './containers/ListContainer';
import Article from './containers/ArticleContainer';
import About from './components/About';
import AddArticle from './containers/AddPostContainer';


class App extends Component {
  render() {
    return (
      <Router basename="Blog-SPA">
        <main className="blog">
          <nav className="blog__nav">
            <Link className="blog__nav-name" to="/" exact="true">LYU</Link>
            <Link className="blog__nav-about" to="about" exact="true">About</Link>
            <Link className="blog__nav-list" to="/post" exact="true">List</Link>
            <Link className="blog__nav-addpost" to="/addpost" exact="true">Add Post</Link>
          </nav>
          <Route exact path="/" component={List} />
          <Route exact path="/post" component={List} />
          <Route path="/about" component={About} />
          <Route
            path="/post/:postId"
            render={() => <Article updataState={this.updateState} />}
          />
          <Route path="/addpost" component={AddArticle} />
        </main>
      </Router>
    );
  }
}


export default App;
