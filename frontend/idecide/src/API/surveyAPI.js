import { getUserContext } from "./loginAPI";
import apiConfig from "../appConfig";
const axios = require("axios");

//"http://8.210.28.169"
const API_URL_FILESERVER = apiConfig().fileServerUrl;
const API_URL = apiConfig().rootApiUrl;

// const API_URL_FILESERVER = process.env.REACT_APP_BACKEND2_URL;
// const API_URL = process.env.REACT_APP_BACKEND_URL;

export function getStaticImageUrlFromName(imageName) {
  return API_URL_FILESERVER + `/images/${imageName}`;
}

export async function getSurveyById(surveyId) {
  const endpoint = API_URL + `/survey/${surveyId}`;
  try {
    const dataFetched = await axios.get(endpoint).then((res) => res.data);
    var survey = JSON.parse(dataFetched["data"]["jsonStr"]);
    Object.assign(survey, dataFetched["data"]);
    delete survey.jsonStr;

    return survey;
  } catch (e) {
    return e;
  }
}

// not sure what this function is for? Looks just like getSurveyById?
export async function getSectionBySurveyId(surveyId) {
  const endpoint = API_URL + `/survey/` + surveyId;

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

//post results for a survey
export async function postingSurvey(surveyIn) {
  const endpoint = API_URL + `/answer`;
  const token = getUserContext().token;

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

  const dataPost = await axios({
    url: endpoint, // send a request to the library API
    method: "PUT", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserContext().token,
    },

    data: surveyInfo,

    //  data: JSON.stringify(JSON.parse(surveyInfo)),
    //   data: JSON.stringify(surveyInfo),
  });

  return dataPost;
}

// export async function addImageForSurvey(nameOfImage, imgData) {
//   await axios({
//     url: API_URL + "/survey/uploadImg", // send a request to the library API
//     method: "POST", // HTTP POST method
//     headers: {
//       "content-type": "multipart/form-data",
//       Authorization: localStorage.getItem("userContext").token,
//     },
//     surveyId: nameOfImage,
//     img: imgData,
//   });
// }

//upload a new image
export async function addImageForSurvey(formData) {
  await axios({
    url: API_URL + "/survey/uploadImg", // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "content-type": "multipart/form-data",
      Authorization: localStorage.getItem("userContext").token,
    },
    data: formData,
  });
}

export async function deleteImage(imageName) {
  await axios({
    url: API_URL + "/survey/delImage", // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("userContext").token,
    },
    data: { path: imageName },
  });
}

export function getAllImageNames() {
  return axios({
    url: API_URL + "/survey/allImgId", // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "content-type": "multipart/form-data",
      Authorization: localStorage.getItem("userContext").token,
    },
  });
}

export async function AddNewSurvey(surveyInfo) {
  const endpoint = API_URL + `/survey`;

  const dataPost = await axios({
    url: endpoint, // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserContext().token,
    },
    data: JSON.stringify(JSON.parse(surveyInfo)),
  });
  return dataPost;
}

export async function DeleteSurvey(surveyId) {
  const endpoint = API_URL + `/survey/` + surveyId;

  const dataPost = await axios({
    url: endpoint, // send a request to the library API
    method: "DELETE", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserContext().token,
    },
    data: surveyId,
  });

  return dataPost;
}
