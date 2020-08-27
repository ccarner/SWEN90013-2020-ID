const axios = require("axios");

const API_URL = "http://8.210.28.169:9009";

export async function getSurveyById(surveyId) {
  const endpoint = API_URL + `/survey/${surveyId}`;
  try {
    const dataFetched = await axios.get(endpoint).then((res) => res.data);
    return JSON.parse(dataFetched["data"]["jsonStr"]);
  } catch (e) {
    return e;
  }
}

export async function getUserResults(userId) {
  const endpoint = API_URL + `/answer/getResult/${userId}`;
  try {
    const dataFetched = axios.get(endpoint).then((res) => res.data);
    return dataFetched;
  } catch (e) {
    return e;
  }
}

export async function getAllSurveys() {
  const endpoint = API_URL + "/survey/allSurveyId";
  try {
    const dataFetched = axios.get(endpoint).then((res) => res.data);
    return dataFetched;
  } catch (e) {
    return e;
  }
}



export async function postingSurvey(surveyIn) {

  const endpoint = `http://8.210.28.169:9010/answer`;

  const dataPost = await axios({
    url: endpoint,  // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(surveyIn)
  });



  return dataPost;

}
