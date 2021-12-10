import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:8080/backend_war',
  // headers: {
  //   Authorization: 'Bearer ' + cookies?.token,
  // }
  // withCredentials: true,
});

export default axios;