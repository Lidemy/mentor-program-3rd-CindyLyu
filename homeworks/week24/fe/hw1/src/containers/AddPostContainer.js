/* eslint-disable react/prop-types */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddPost from '../components/AddPost';
import * as Actions from '../actions';


const AddPostContainer = props => <AddPost {...props} />;

const mapStateToProps = state => ({
  isLoadingCreatePost: state.isLoadingCreatePost,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  createPost: (title, author, body) => {
    dispatch(Actions.createPost(title, author, body));
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPostContainer));
