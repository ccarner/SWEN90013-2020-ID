const axios = require("axios");

const API_BASE = "http://8.210.28.169";
const API_URL = "http://8.210.28.169:9009";


export function getStaticImageUrlFromName(imageName) {
  return API_BASE + `/images/${imageName}`;
}

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
    url: endpoint, // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(surveyIn),
  });

  return dataPost;
}

export async function editSurvey(surveyInfo) {
  const endpoint = API_URL + `/survey`;
  console.log(772, surveyInfo);
  alert();
  const dataPost = await axios({
    url: endpoint, // send a request to the library API
    method: "PUT", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
    },

    data: surveyInfo

    //  data: JSON.stringify(JSON.parse(surveyInfo)),
    //   data: JSON.stringify(surveyInfo),
  });

  return dataPost;
}

export async function AddNewSurvey(surveyInfo) {
  const endpoint = API_URL + `/survey`;
  console.log(surveyInfo);
  const dataPost = await axios({
    url: endpoint, // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify((JSON.parse(surveyInfo))),
  });

  return dataPost;
}



export async function DeleteSurvey(surveyId) {
  const endpoint = API_URL + `/survey/` + surveyId;
  console.log(surveyId);
  const dataPost = await axios({
    url: endpoint, // send a request to the library API
    method: "DELETE", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
    },
    data: surveyId,
  });

  return dataPost;
}