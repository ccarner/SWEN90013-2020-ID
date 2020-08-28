const axios = require("axios");

const SURVEY_RESULT_URL = " http://8.210.28.169:9009";

export async function getCsvDownloadLink() {
  const endpoint = SURVEY_RESULT_URL + `/answer/downloadResult`;
  try {
    const dataFetched = axios.get(endpoint).then((res) => res.data);
    return dataFetched;
  } catch (e) {
    return e;
  }
}
