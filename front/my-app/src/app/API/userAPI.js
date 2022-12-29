import axios from "axios";
import {
  URL_LOGIN,
  URL_REGISTER,
  URL_LOGOUT,
  URL_ADMIN_USERS,
} from "../data/constants";

export function doLogin(loginData) {
  return new Promise((resolve) =>
    axios.post(URL_LOGIN, loginData).then((res) => resolve({ data: res.data }))
  );
}

export function register(registerData) {
  return new Promise((resolve) =>
    axios
      .post(URL_REGISTER, registerData)
      .then((res) => resolve({ data: res.data }))
  );
}

export function logout(token) {
  return new Promise((resolve) =>
    axios(URL_LOGOUT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))
  );
}

export function getUsers(token) {
  return new Promise((resolve) =>
    axios(URL_ADMIN_USERS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))
  );
}
