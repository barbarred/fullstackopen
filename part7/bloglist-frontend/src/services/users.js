import axios from 'axios';
const baseUrl = '/api/users';

const getUsers = () => {
  const request = axios.get(baseUrl).then((response) => response.data);
  return request;
};

export default { getUsers };
