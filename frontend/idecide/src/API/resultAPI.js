import { getUserContext } from "./loginAPI";
const axios = require("axios");

const USER_URL = process.env.REACT_APP_BACKEND_URL;

export async function getResultByUser(userId) {
  var endpoint = USER_URL + `/answer/getResult/${userId}`;
  const result = await axios({
    url: endpoint, // send a request to the library API
    method: "GET", // HTTP GET method
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserContext().token,
    },
  });
  return result.data.data;
}
