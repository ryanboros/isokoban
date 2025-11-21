import axios from "axios";

const api = () => {
  return axios.create({
    baseURL: `./data/`,
  });
};

export default api;
