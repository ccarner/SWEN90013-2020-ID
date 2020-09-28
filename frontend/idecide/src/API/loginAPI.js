const axios = require("axios");

// const USER_URL = "http://34.64.134.143:9008";
const USER_URL = "https://www.idecide.icu:9012";
// https://www.idecide.icu:9012/user/

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
      "Authorization": localStorage.getItem("token")
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

export async function getAllAdmins() {
  const endpoint = USER_URL + `/admin/adminList`;
  try {
    const result = await axios({
      url: endpoint, // send a request to the library API
      method: "GET", // HTTP GET method
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });
    console.log(552, endpoint)
    console.log(553, result.data)
    return result.data;
  } catch (e) {
    return e;
  }
}



export function getAllUsers() {
  const endpoint = `https://www.idecide.icu:9012/user/userList`;
  try {
    return axios.get(endpoint).then((res) => res.data);
  } catch (e) {
    return e;
  }
}


export async function loginUser(userIn) {
  const { email, password } = userIn;
  var endpoint = USER_URL + `/user/login`;
  if (userIn.email === "ccarner13@gmail.com") {
    endpoint = USER_URL + `/admin/login`;
  }
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
  console.log(222, result);
  console.log(223, result.data.data);
  localStorage.setItem("token", result.data.data.token);
  localStorage.setItem("userType", result.data.data.roles);
  localStorage.setItem("userId", result.data.data.id);
  return result.data;
}


export async function anonymouseUser() {
  var endpoint = USER_URL + `/user/anonymousLogin`;
  const result = await axios({
    url: endpoint, // send a request to the library API
    method: "GET", // HTTP GET method
    headers: {
      "Content-Type": "application/json"
    }
  });

  localStorage.setItem("token", result.data.data.token);
  localStorage.setItem("userType", "anonymous");
  localStorage.setItem("userId", result.data.data.id);
  return result.data.data.id;
}


