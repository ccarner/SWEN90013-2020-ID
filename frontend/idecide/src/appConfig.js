//debug

export default function getConfig() {
  // if (process.env.REACT_APP_BACKEND_URL) {
  if (false) {
    return {
      rootApiUrl: process.env.REACT_APP_BACKEND_URL,
      fileServerUrl: process.env.REACT_APP_BACKEND2_URL,
      csvFileLocation: "/files/totalResult.csv",
      debug: true,
    };
  } else {
    //debug
    return {
      rootApiUrl: "https://www.idecide.icu:9012",
      fileServerUrl: "https://www.idecide.icu:443",
      csvFileLocation: "/files/totalResult.csv",
      debug: false,
    };
  }
}

// const API_URL_FILESERVER = process.env.REACT_APP_BACKEND2_URL;
// const API_URL = process.env.REACT_APP_BACKEND_URL;

//prod

// export default {
//   rootApiUrl: "process.env.REACT_APP_BACKEND_URL",
//   fileServerUrl: "process.env.REACT_APP_BACKEND2_URL",
//   csvFileLocation: "/files/totalResult.csv",
// };
