import axios from "axios";
import { ENDPOINT } from "../constants";

const request = axios.create({ baseURL: ENDPOINT });

export default request;
