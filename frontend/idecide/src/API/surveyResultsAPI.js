import { getUserContext } from "./loginAPI";
const axios = require("axios");

const SURVEY_RESULT_URL = "https://www.idecide.icu:9012";

export async function getCsvDownloadLink() {
  const endpoint = SURVEY_RESULT_URL + `/answer/downloadResult`;
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
  const endpoint = SURVEY_RESULT_URL + `/actionplan/actionStrategyRule`;
  try {
    const dataFetched = axios.get(endpoint).then((res) => res.data);
    return dataFetched;
  } catch (e) {
    return e;
  }
}

export async function getResults() {
  const endpoint = `https://www.idecide.icu:9012/answer/getResult`;
  try {
    const dataFetched = axios.get(endpoint).then((res) => res.data);
    return dataFetched;
  } catch (e) {
    return e;
  }
}
