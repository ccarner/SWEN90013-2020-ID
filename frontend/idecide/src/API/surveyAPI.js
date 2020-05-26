const axios = require('axios');


const Survey_URL = "http://8.210.28.169:9009";





export function getRelationQuestions() {
    const endpoint = Survey_URL + `/module/1265237263474888704`;
    try {
        return axios.get(endpoint).then(res => res.data);
    } catch (e) {
        return e;
    }
}




