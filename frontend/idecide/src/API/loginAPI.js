const axios = require('axios');


const USER_URL = "http://8.210.28.169:9008";


export function registerUser(userIn) {

    const { username,
        password,
        partnerGender,
        email,
        phoneNumber,
        postcode } = userIn;

    const endpoint = USER_URL + `/user`;


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
    const endpoint = USER_URL + `/admin/adminList`;
    try {
        return axios.get(endpoint).then(res => res.data);
    } catch (e) {
        return e;
    }
}




export function loginUser(userIn) {

    const { email, password } = userIn;
    const endpoint = USER_URL + `/userRegister`;

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
