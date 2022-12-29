import axios from "axios";
import {
  URL_PRODUCTS,
  URL_ADMIN_PRODUCTS,
  URL_GET_IMAGES,
  URL_ADD_SIZE,
  URL_PRODUCT_ADMIN,
} from "../data/constants";

export function getProductsByCategory(category) {
  return new Promise((resolve) =>
    axios(URL_PRODUCTS + category).then((res) => resolve({ data: res.data }))
  );
}

export function getProductsByName(category, name) {
  return new Promise((resolve) =>
    axios(`${URL_PRODUCTS}${category}/${name}`).then((res) =>
      resolve({ data: res.data })
    )
  );
}

export function getAllProducts(token) {
  return new Promise((resolve) =>
    axios(URL_ADMIN_PRODUCTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))
  );
}

export function addNewProduct(productData) {
  return new Promise((resolve) =>
    axios
      .post(URL_ADMIN_PRODUCTS, productData.data, {
        headers: {
          Authorization: `Bearer ${productData.token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}

export function getProductImages(token) {
  return new Promise((resolve) =>
    axios(URL_GET_IMAGES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => resolve({ data: res.data }))
  );
}

export function addNewSize(productData) {
  return new Promise((resolve) =>
    axios
      .post(
        URL_ADD_SIZE,
        { data: productData.data, sizes: productData.newSizes },
        {
          headers: {
            Authorization: `Bearer ${productData.token}`,
          },
        }
      )
      .then((res) => resolve({ data: res.data }))
  );
}

export function deleteProduct(data) {
  return new Promise((resolve) =>
    axios
      .delete(URL_PRODUCT_ADMIN + data.id, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}

export function updateProduct(data) {
  return new Promise((resolve) =>
    axios
      .put(URL_PRODUCT_ADMIN + data.id, data.product, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}
