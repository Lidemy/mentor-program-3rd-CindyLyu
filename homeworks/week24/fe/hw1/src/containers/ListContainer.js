/* eslint-disable react/prop-types */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '../components/List';
import * as Actions from '../actions';


const ListContainer = props => <List {...props} />;

const mapStateToProps = state => ({
  isLoadingGetPostList: state.isLoadingGetPostList,
  postList: state.postList,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  getPostList: () => {
    dispatch(Actions.getPostList());
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
