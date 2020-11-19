import apiConfig from "../appConfig";
const axios = require("axios");

const API_URL = apiConfig().rootApiUrl;

// const API_URL = process.env.REACT_APP_BACKEND_URL;

export async function registerUser(userIn) {
  const { username, password } = userIn;

  const endpoint = API_URL + `/user`;

  const result = await axios({
    url: endpoint, // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
      Authorization: getUserContext().token,
    },
    data: JSON.stringify({
      username,
      password,
    }),
  });

  if (result.data.flag) {
    loginUser({ username: username, password: password });
  }

  return result.data;
}

export async function getAllAdmins() {
  const endpoint = API_URL + `/admin/adminList`;
  try {
    const result = await axios({
      url: endpoint, // send a request to the library API
      method: "GET", // HTTP GET method
      headers: {
        "Content-Type": "application/json",
        Authorization: getUserContext().token,
      },
    });
    return result.data;
  } catch (e) {
    return e;
  }
}

export function getAllUsers() {
  const endpoint = API_URL + `/user/userList`;
  try {
    return axios.get(endpoint).then((res) => res.data);
  } catch (e) {
    return e;
  }
}

export function getUserContext() {
  return JSON.parse(localStorage.getItem("userContext"));
}

export async function loginUser(userIn) {
  const { username, password } = userIn;
  var endpoint = API_URL + `/user/login`;

  // alert(112);
  // console.log(112, process.env.REACT_APP_BACKEND2_URL);

  const result = await axios({
    url: endpoint, // send a request to the library API
    method: "POST", // HTTP POST method
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      username,
      password,
    }),
  });

  if (result.data.flag) {
    let userContext = {
      userType: result.data.data.roles,
      token: result.data.data.token,
      userId: result.data.data.id,
    };
    localStorage.setItem("userContext", JSON.stringify(userContext));
  }

  return result.data;
}

export async function anonymousUser() {
  var endpoint = API_URL + `/user/anonymousLogin`;
  const result = await axios({
    url: endpoint, // send a request to the library API
    method: "GET", // HTTP GET method
    headers: {
      "Content-Type": "application/json",
    },
  });

  let userContext = {
    // userType: result.data.data.roles,
    userType: "anon",
    token: result.data.data.token,
    userId: result.data.data.id,
  };
  localStorage.setItem("userContext", JSON.stringify(userContext));

  return result.data.data.id;
}
