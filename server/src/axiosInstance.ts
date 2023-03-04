import axios from 'axios'
import { tokens } from 'firebase';

const axiosInstance = axios.create({
    baseURL: "https://zick3333.amocrm.ru/",
    timeout: 0,
    headers: {
        Accept: "application/json",
    },
});

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axiosInstance.defaults.headers.post["Access-Control-Allow-Methods"] =
    "GET,PUT,POST,DELETE,PATCH,OPTIONS";
axiosInstance.defaults.headers.post["Access-Control-Allow-Credentials"] = true;

export const auth = () => {
    return tokens.access_token ? { Authorization: "Bearer " + tokens.access_token } : {};
};

export default axiosInstance;
