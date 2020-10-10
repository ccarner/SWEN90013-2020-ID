const axios = require("axios");

const API_BASE = "http://8.210.28.169";
const API_URL = "https://www.idecide.icu:9012";

export function getStaticImageUrlFromName(imageName) {
  return API_BASE + `/images/${imageName}`;
}

export async function getSurveyById(surveyId) {
  const endpoint = API_URL + `/survey/${surveyId}`;
  try {
    const dataFetched = await axios.get(endpoint).then((res) => res.data);
    var survey = JSON.parse(dataFetched["data"]["jsonStr"]);
    Object.assign(survey, dataFetched["data"]);
    delete survey.jsonStr;
    console.log("pulled survey was", survey);
    return survey;
  } catch (e) {
    return e;
  }
}

// not sure what this function is for? Looks just like getSurveyById?
export async function getSectionBySurveyId(surveyId) {
  const endpoint = API_URL + `/survey/` + surveyId;
  console.log(endpoint);
  try {
    const dataFetched = await axios.get(endpoint).then((res) => res.data);
    console.log(dataFetched);
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
  const endpoint = API_URL + `/answer`;
  const token = localStorage.getItem("token");

  const dataPost = await axios({
    url: endpoint, // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: JSON.stringify(surveyIn),
  });

  return dataPost;
}

export async function editSurvey(surveyInfo) {
  const endpoint = API_URL + `/survey`;
  console.log(surveyInfo);
  const dataPost = await axios({
    url: endpoint, // send a request to the library API
    method: "PUT", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },

    data: surveyInfo,

    //  data: JSON.stringify(JSON.parse(surveyInfo)),
    //   data: JSON.stringify(surveyInfo),
  });

  return dataPost;
}

export async function addImageForSurvey(surveyId, imgUrl) {
  await axios({
    url:  API_URL + "/survey/uploadImg", // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "content-type": "multipart/form-data",
     //  Authorization: localStorage.getItem("token"),
    },
    surveyId: surveyId,
    img: imgUrl,
  });
}

export async function AddNewSurvey(surveyInfo) {
  const endpoint = API_URL + `/survey`;
  console.log(surveyInfo);
  console.log("surveyInfo",localStorage.getItem("token"));
  const dataPost = await axios({
    url: endpoint, // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    data: JSON.stringify(JSON.parse(surveyInfo)),
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
      Authorization: localStorage.getItem("token"),
    },
    data: surveyId,
  });

  return dataPost;
}
