import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://lifedrop-server.vercel.app",
  withCredentials: false,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
