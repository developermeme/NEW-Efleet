import axios from "axios";
axios.defaults.baseURL = "https://api.sun-vpn.com:8443/efleet";

axios.defaults.headers = {
  "Content-Type": "application/json",
} as any;

export const handleError = (error: any) => {
  if (error.response) {
    let displayMsg = null;
    if (error.response.message) {
      displayMsg = error.response.message;
    } else if (error.response.data) {
      if (error.response.data.message) {
        displayMsg = error.response.data.message;
      } else if (error.response.data.errors && error.response.data.errors[0]) {
        displayMsg = error.response.data.errors[0].error;
      } else if (error.response.data.error) {
        displayMsg = error.response.data.error;
      } else {
        displayMsg = error.response.data;
      }
    } else if (error.response.statusText) {
      displayMsg = error.response.statusText;
    }
    console.log("ERROR", displayMsg);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    const errorMessage =
      error.request.status === 0
        ? "Please check your internet connection!"
        : "Something went wrong. Try again";
    console.log("ERROR", errorMessage);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log("errorConfig", error.config);
};

function GET(url: any, paramsValue = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: paramsValue })
      .then((response) => resolve(response))
      .catch(function (error) {
        handleError(error);
        reject(error);
      });
  });
}

function POST(url: any, paramsValue = {}, data = null, headers = null) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, { params: paramsValue })
      .then((response) => resolve(response))
      .catch((error) => {
        handleError(error);
        reject(error);
      });
  });
}

export { GET, POST };
