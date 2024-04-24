import axios from "axios";
import { toast } from "react-toastify";

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
      // check if error code is 401
      if (error.response.status === 401) {
        toast.error(error.response.data.message || "Unauthorized access");
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInterceptor;
