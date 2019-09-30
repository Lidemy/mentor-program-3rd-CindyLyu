const axios = require('axios');

const baseUrl = 'https://qootest.com/posts/';

export const getPosts = () => axios.get(baseUrl);

export const getPost = postId => axios.get(`${baseUrl}${postId}`);

export const putPost = (postId, title, author, body) => axios.put(`${baseUrl}${postId}`, {
                                                          title,
                                                          author,
                                                          body,
                                                        });

export const deletePost = postId => axios.delete(`${baseUrl}${postId}`);

export const addPost = (title, author, body) => axios.post('https://qootest.com/posts', {
                                                  title,
                                                  author,
                                                  body,
                                                });
