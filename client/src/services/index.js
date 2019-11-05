import axios from "axios";

export default () => {
  return axios.create({ baseURL: process.env.VUE_APP_API_URL + "/api/v1" });
};
