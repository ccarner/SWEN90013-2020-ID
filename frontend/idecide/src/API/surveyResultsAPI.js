const axios = require("axios");

const SURVEY_RESULT_URL = "https://www.idecide.icu:9012";

export async function getCsvDownloadLink() {
  const endpoint = SURVEY_RESULT_URL + `/answer/downloadResult`;
  try {
    const dataFetched = axios.get(endpoint).then((res) => res.data);
    return dataFetched;
  } catch (e) {
    return e;
  }
}

export async function getActionPlanStrategy() {
  const endpoint = SURVEY_RESULT_URL + `/actionplan/actionStrategyRule`;
  try {
    const dataFetched = axios.get(endpoint).then((res) => res.data);
    return dataFetched;
  } catch (e) {
    return e;
  }
}
