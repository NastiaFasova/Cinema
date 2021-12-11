import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'X-CSRF-TOKEN': '',
  },
  // withCredentials: true,
});

export default axios;