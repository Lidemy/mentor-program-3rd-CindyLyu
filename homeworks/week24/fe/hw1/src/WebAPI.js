const axios = require('axios');

const baseUrl = 'https://qootest.com/posts/';

export const getPosts = () => axios.get(`${baseUrl}?_sort=id&_order=desc`);

export const getPost = postId => axios.get(`${baseUrl}${postId}`);

export const updatePost = (postId, title, author, body) => axios.put(`${baseUrl}${postId}`, {
                                                              title,
                                                              author,
                                                              body,
                                                            });

export const deletePost = postId => axios.delete(`${baseUrl}${postId}`);

export const createPost = (title, author, body) => axios.post(`${baseUrl}`, {
                                                      title,
                                                      author,
                                                      body,
                                                    });
