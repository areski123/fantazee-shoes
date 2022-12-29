import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getProductsByCategory,
  getProductsByName,
  addNewProduct,
  getAllProducts,
  getProductImages,
  addNewSize,
  deleteProduct,
  updateProduct,
} from "../API/productAPI";

const initialState = {
  status: "loading",
  productsByCategory: [],
  productsByName: [],
  singleProduct: [],
  sizes: [],
  allProducts: [],
  productImages: [],
};

export const getProductsByCategoryAsync = createAsyncThunk(
  "product/getProductsByCategory",
  async (category) => {
    const response = await getProductsByCategory(category);
    const data = await renderProduct(response.data);
    return data;
  }
);

const renderProduct = async (products) => {
  const productsNames = [];
  const productsObjects = [];
  for (const product of products) {
    //iterates over a list of products and returns it without repeats
    if (!productsNames.includes(product.name)) {
      productsNames.push(product.name);
      productsObjects.push(product);
    }
  }
  return productsObjects;
};

const getSizes = async (products) => {
  const sizes = [];
  for (let prod of products) {
    //iterates over a list of products and returns a list of sizes for a specific model
    if (!sizes.includes(prod.size)) {
      sizes.push(prod.size);
    }
  }
  return sizes;
};

export const getProductsByNameAsync = createAsyncThunk(
  "product/getProductsByName",
  async (data) => {
    const response = await getProductsByName(data.products_category, data.name);
    const sizes = await getSizes(response.data);
    return [response.data, sizes];
  }
);

//admin actions
export const getAllProductsAsync = createAsyncThunk(
  "product/getAllProducts",
  async (token) => {
    const response = await getAllProducts(token);
    return response.data;
  }
);

export const addNewProductAsync = createAsyncThunk(
  "product/addNewProduct",
  async (data) => {
    const response = await addNewProduct(data);
    return response.data;
  }
);

export const getProductImagesAsync = createAsyncThunk(
  "product/getProductImages",
  async (token) => {
    const response = await getProductImages(token);
    return response.data;
  }
);

export const addNewSizeAsync = createAsyncThunk(
  "product/addNewSize",
  async (data) => {
    const response = await addNewSize(data);
    return response.data;
  }
);

export const deleteProductAsync = createAsyncThunk(
  "product/deleteProduct",
  async (data) => {
    const response = await deleteProduct(data);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (data) => {
    console.log(data);
    const response = await updateProduct(data);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCategoryAsync.fulfilled, (state, action) => {
        state.productsByCategory = action.payload;
        state.status = "idle";
      })
      .addCase(getProductsByNameAsync.fulfilled, (state, action) => {
        state.singleProduct = action.payload[0][0];
        state.productsByName = action.payload[0];
        //sorts the list of sizes from smallest to largest
        state.sizes = action.payload[1].sort();
      })
      .addCase(getProductImagesAsync.fulfilled, (state, action) => {
        state.productImages = action.payload;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(addNewProductAsync.fulfilled, (state, action) => {
        state.allProducts.push(action.payload);
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        console.log(action.payload.id);
        state.allProducts = state.allProducts.filter(
          (product) => product._id !== +action.payload.id
        );
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        let foundIndex = state.allProducts.findIndex(
          (product) => product._id === action.payload._id
        );
        state.allProducts[foundIndex] = action.payload;
      });
  },
});

export const selectProductsByCategory = (state) =>
  state.product.productsByCategory;
export const selectProductsByName = (state) => state.product.productsByName;
export const selectSizes = (state) => state.product.sizes;
export const selectSingleProduct = (state) => state.product.singleProduct;
export const selectStatus = (state) => state.product.status;
export const selectAllProducts = (state) => state.product.allProducts;
export const selectProductImages = (state) => state.product.productImages;

export default productSlice.reducer;
