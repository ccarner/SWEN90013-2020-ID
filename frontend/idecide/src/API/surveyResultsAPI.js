import { getUserContext } from "./loginAPI";
import apiConfig from "../appConfig";
const axios = require("axios");

const API_URL = apiConfig().rootApiUrl;
// const API_URL = process.env.REACT_APP_BACKEND_URL;

export async function getCsvDownloadLink() {
  const endpoint = API_URL + `/answer/downloadResult`;
  const dataPost = await axios({
    url: endpoint, // send a request to the library API
    method: "GET", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserContext().token,
    },
  });

  return dataPost;
}

//todo not sure we use this api?
export async function getActionPlanStrategy() {
  const endpoint = API_URL + `/actionplan/actionStrategyRule`;
  try {
    const dataFetched = axios.get(endpoint).then((res) => res.data);
    return dataFetched;
  } catch (e) {
    return e;
  }
}

export async function getResults() {
  const endpoint = API_URL + `/answer/getResult`;
  try {
    const dataFetched = axios.get(endpoint).then((res) => res.data);
    return dataFetched;
  } catch (e) {
    return e;
  }
}
