const axios = require('axios');


const SURVEY_URL = "http://8.210.28.169:9009";





export function getRelationQuestions() {
    const endpoint = SURVEY_URL + `/module/1265280071179046912`;
    try {
        return axios.get(endpoint).then(res => res.data);
    } catch (e) {
        return e;
    }
}




