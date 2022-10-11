import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URL = "https://interview.paratica.com/auth";

const login = (username, password) => {
  return axios
    .post(API_URL, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        let decoded = jwtDecode(response.data.token);
        localStorage.setItem("role", JSON.stringify(decoded.role));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getCurrentRole = () => {
  let adminRole = localStorage.getItem("role");
  let toParse = JSON.parse(adminRole);
  if (toParse === "admin") {
    return true;
  }
};

const authService = {
  login,
  logout,
  getCurrentUser,
  getCurrentRole,
};

export default authService;
