import React from 'react';
import './index.sass';
import BlogList from './BlogList';
import BlogArticle from './BlogArticle';
import BlogAbout from './BlogAbout';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  return (
    <Router>
        <main className="blog">
          <nav className="blog__nav">
            <Link className="blog__nav-name" to='/' exact='true'>LYU</Link>
            <Link className="blog__nav-list" to='/post' exact='true'>List</Link>
            <Link className="blog__nav-about" to='/about'>About</Link>
          </nav>
          <Route exact path='/' component={BlogList} />
          <Route exact path='/post' component={BlogList} />
          <Route path='/about' component={BlogAbout} />
          <Route path='/post/:postId' component={BlogArticle} />
        </main> 
    </Router>
  );
}


export default App;
