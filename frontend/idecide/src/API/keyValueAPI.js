import { getUserContext } from "./loginAPI";
const axios = require("axios");

const USER_URL = process.env.REACT_APP_BACKEND_URL;

export async function getValue(key) {
  const endpoint = USER_URL + `/kv/${key}`;

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
  const endpoint = USER_URL + `/user`;

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
