const axios = require('axios');


const SURVEY_URL = "http://8.210.28.169:9009";


export async function getSurveyQuestions(surveyType) {

    if (surveyType === "RELATIONSHIP") {
        return await getRelationQuestions();
    } else if (surveyType === "SAFETY") {
        return await getSafetyQuestions();
    } else if (surveyType === "PRIORITIS") {
        return await getPriorityQuestions();
    } else {
        return "Nothing Fetched, error";
    }
}

export function getRelationQuestions() {
    const endpoint = SURVEY_URL + `/survey/13`;
    try {
        const dataFetched = axios.get(endpoint).then(res => res.data);
        return dataFetched;
    } catch (e) {
        return e;
    }
}


export function getSafetyQuestions() {
    const endpoint = SURVEY_URL + `/survey/22`;
    try {
        const dataFetched = axios.get(endpoint).then(res => res.data);
        return dataFetched;
    } catch (e) {
        return e;
    }
}


export function getPriorityQuestions() {
    const endpoint = SURVEY_URL + `/survey/31`;
    try {
        const dataFetched = axios.get(endpoint).then(res => res.data);
        return dataFetched;
    } catch (e) {
        return e;
    }
}


export function postingSurvey(surveyIn) {

    const endpoint = `http://8.210.28.169:9010/answer`;

    const dataPost = axios({
        url: endpoint,  // send a request to the library API
        method: "POST", // HTTP POST method
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(surveyIn)
    });

    return dataPost;
}




