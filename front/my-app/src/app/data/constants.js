export const URL = process.env.REACT_APP_URL
  ? process.env.REACT_APP_URL
  : "http://localhost:8000";

export const URL_PRODUCTS = `${URL}/products/`;
export const URL_ADMIN_PRODUCTS = `${URL}/all_products`;
export const URL_ADMIN_USERS = `${URL}/get_users`;
export const URL_PRODUCT_ADMIN = `${URL}/product/`;
export const URL_GET_IMAGES = `${URL}/get_images`;
export const URL_ADD_IMAGE = `${URL}/posts`;
export const URL_ADD_SIZE = `${URL}/product_size`;
export const URL_LOGIN = `${URL}/login`;
export const URL_REGISTER = `${URL}/register`;
export const URL_LOGOUT = `${URL}/logout`;
export const URL_NEW_ORDER = `${URL}/add_order`;
export const URL_USER_ORDERS = `${URL}/user_orders`;
export const URL_ADMIN_ORDERS = `${URL}/orders`;
export const CURRENCY_CODE = "USD";
