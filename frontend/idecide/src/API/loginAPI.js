const axios = require('axios');


const BACKEND_URL = "https://idecide-back-end-server.com";
// const BACKEND_URL = "http://localhost:3000";

export function loginUser(userIn) {

    const { email, password } = userIn;
    const endpoint = BACKEND_URL + `/userLogin`;
    // check if the email is present

    if (!email) {
        alert("must include a valid email address");
        return;
    }

    return axios({
        url: endpoint,  // send a request to the library API
        method: "POST", // HTTP POST method
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            email,
            password
        })
    })
}

export function registerUser(userIn) {

    const { email, password } = userIn;
    const endpoint = BACKEND_URL + `/userRegister`;

    // check if the email is present

    if (!email) {
        alert("must include a valid email address");
        return;
    }

    return axios({
        url: endpoint,  // send a request to the library API
        method: "POST", // HTTP POST method
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            email,
            password
        })
    })
}
