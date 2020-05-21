const axios = require('axios');


const BACKEND_URL = "http://35.189.32.209:9008";
// const BACKEND_URL = "http://localhost:3000";

export function registerUser(userIn) {

    const { username,
        password,
        partnerGender,
        email,
        phoneNumber,
        postcode } = userIn;

    const endpoint = BACKEND_URL + `/user`;


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
            username,
            password,
            partnerGender,
            email,
            phoneNumber,
            postcode
        })
    })
}


export function getAllAdmins() {
    const endpoint = BACKEND_URL + `/admin/adminList`;
    try {
        return axios.get(endpoint).then(res => res.data);
    } catch (e) {
        return e;
    }
}




export function loginUser(userIn) {

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
