import axios from axios;
export const apiUrl = axios.create({
    baseURL: "http://localhost:8080/api/",
  });
