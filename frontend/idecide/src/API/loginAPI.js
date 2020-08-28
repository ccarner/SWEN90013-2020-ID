const axios = require("axios");

const USER_URL = "http://34.64.134.143:9008";

export async function registerUser(userIn) {
  const {
    username,
    password,
    partnerGender,
    email,
    phoneNumber,
    postcode,
  } = userIn;

  const endpoint = USER_URL + `/user`;

  if (!email) {
    alert("must include a valid email address");
    return false;
  }

  const result = await axios({
    url: endpoint, // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      // partnerGender,
      // phoneNumber,
      // postcode,
      username,
      password,
      email,
    }),
  });

  return result.data;
}

export function getAllAdmins() {
  const endpoint = USER_URL + `/admin/adminList`;
  try {
    return axios.get(endpoint).then((res) => res.data);
  } catch (e) {
    return e;
  }
}

export async function loginUser(userIn) {
  const { email, password } = userIn;
  const endpoint = USER_URL + `/admin/login`;

  // check if the email is present

  if (!email) {
    alert("must include a valid email address");
    return false;
  }

  const result = await axios({
    url: endpoint, // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      email,
      password,
    }),
  });

  return result.data;
}
