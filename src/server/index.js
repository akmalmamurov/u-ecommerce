import axios from "axios";
import { ENDPOINT } from "../constants";

const request = axios.create({ baseURL: ENDPOINT  });

request.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default request;
