import { getUserContext } from "./loginAPI";
import apiConfig from "../appConfig";
const axios = require("axios");

const API_URL = apiConfig().rootApiUrl;
// const API_URL = process.env.REACT_APP_BACKEND_URL;

export async function getValue(key) {
  const endpoint = API_URL + `/kv/${key}`;

  const result = await axios({
    url: endpoint, // send a request to the library API
    method: "GET", // HTTP GET method
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.data.data;
}

export async function setValue(key, value) {
  const endpoint = API_URL + `/kv/`;

  const result = await axios({
    url: endpoint, // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserContext().token,
    },
    data: JSON.stringify({
      key: key,
      value: value,
    }),
  });

  return result.data;
}
