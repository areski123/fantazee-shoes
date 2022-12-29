import axios from "axios";
import {
  URL_NEW_ORDER,
  URL_USER_ORDERS,
  URL_ADMIN_ORDERS,
} from "../data/constants";

export function sendOrder(data) {
  return new Promise((resolve) =>
    axios
      .post(URL_NEW_ORDER, data, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}

export function getUserOrders(token) {
  return new Promise((resolve) =>
    axios(URL_USER_ORDERS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))
  );
}

export function getAllOrders(token) {
  return new Promise((resolve) =>
    axios(URL_ADMIN_ORDERS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))
  );
}
