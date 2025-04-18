import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updateLikes = async (objectUpdated, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, objectUpdated);
  return response.data;
};

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
  return response.data;
};

const deletePost = async (idPost) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${idPost}`, config);
  return response.data;
};

export default {
  getAll,
  create,
  setToken,
  updateLikes,
  addComment,
  deletePost,
};
