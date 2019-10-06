/* eslint-disable react/prop-types */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Article from '../components/Article';
import * as Actions from '../actions';


const ArticleContainer = props => <Article {...props} />;

const mapStateToProps = state => ({
  isLoadingGetPost: state.isLoadingGetPost,
  isLoadingDeletePost: state.isLoadingDeletePost,
  isLoadingUpdatePost: state.isLoadingUpdatePost,
  post: state.post,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  getPost: (id) => {
    dispatch(Actions.getPost(id));
  },
  deletePost: (id) => {
    dispatch(Actions.deletePost(id));
  },
  updatePost: (id, title, author, body) => {
    dispatch(Actions.updatePost(id, title, author, body));
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleContainer));
