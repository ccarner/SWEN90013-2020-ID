const axios = require("axios");

const USER_URL = "https://www.idecide.icu:9012";

export async function getResultByUser(userId) {
    var endpoint = USER_URL + `/answer/getResult/${userId}`;
    const result = await axios({
        url: endpoint, // send a request to the library API
        method: "GET", // HTTP GET method
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
    console.log(322, result)
    console.log(323, result.data.data)

    return result.data.data;
}