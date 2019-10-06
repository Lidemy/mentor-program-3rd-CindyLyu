import * as webAPI from './WebAPI';

// action creators
export const getPostList = () => ({
  type: 'GET_POST_LIST',
  payload: webAPI.getPosts(),
});

export const getPost = id => ({
  type: 'GET_POST',
  payload: webAPI.getPost(id),
});

export const deletePost = id => ({
  type: 'DELETE_POST',
  payload: webAPI.deletePost(id),
});

export const updatePost = (id, title, author, body) => ({
  type: 'UPDATE_POST',
  payload: webAPI.updatePost(id, title, author, body),
});

export const createPost = (title, author, body) => ({
  type: 'CREATE_POST',
  payload: webAPI.createPost(title, author, body),
});
