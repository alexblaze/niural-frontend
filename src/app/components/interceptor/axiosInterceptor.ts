import Axios from "axios";

export const axiosInstance = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000,
});

//add token to all request
axiosInstance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = process.env.REACT_APP_SECRET_KEY;

  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject({
      message: "Some unusual error occured, please try again",
    });
  }
);
