import axios from "axios";

const axiosInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      console.log("Request was sent");
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default axiosInterceptor;
