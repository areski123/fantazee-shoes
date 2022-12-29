import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendOrder, getUserOrders, getAllOrders } from "../API/orderAPI";

const initialState = {
  orders: [],
  productToOrder: [],
  deliveryDetails: [],
  orderTotal: 0,
  formSubmit: false,
  shippingPrice: 0,
  paymentMethod: "",
  userOrders: [],
};

export const sendOrderAsync = createAsyncThunk(
  "order/sendOrder",
  async (orderData) => {
    const response = await sendOrder(orderData);
    return response.data;
  }
);

export const getUserOrdersAsync = createAsyncThunk(
  "order/getUserOrders",
  async (token) => {
    const response = await getUserOrders(token);
    return response.data;
  }
);

export const getAllOrdersAsync = createAsyncThunk(
  "order/getAllOrders",
  async (token) => {
    const response = await getAllOrders(token);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderProduct: (state, action) => {
      let tempTotal = 0;
      state.productToOrder = action.payload;
      if (state.productToOrder.length) {
        state.productToOrder.forEach((prod) => {
          //when a new product is added to the order, it recalculates the total
          tempTotal += prod.subtotal;
        });
      }
      state.orderTotal = tempTotal;
    },
    setSubmit: (state, action) => {
      state.formSubmit = action.payload;
    },
    setDetails: (state, action) => {
      state.deliveryDetails = action.payload;
    },
    setShipingPrice: (state, action) => {
      state.shippingPrice = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(sendOrderAsync.fulfilled, (state, action) => {
      state.productToOrder = [];
      state.deliveryDetails = [];
      state.orderTotal = 0;
      state.formSubmit = false;
      state.shippingPrice = 0;
      state.paymentMethod = "";
    });
    builder.addCase(getUserOrdersAsync.fulfilled, (state, action) => {
      state.userOrders = action.payload;
    });
    builder.addCase(getAllOrdersAsync.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const {
  setOrderProduct,
  setDetails,
  setSubmit,
  setShipingPrice,
  setPaymentMethod,
} = orderSlice.actions;
export const selectOrders = (state) => state.order.orders;
export const selectProductToOrder = (state) => state.order.productToOrder;
export const selectDeliveryDetails = (state) => state.order.deliveryDetails;
export const selectOrderTotal = (state) => state.order.orderTotal;
export const selectFormSubmit = (state) => state.order.formSubmit;
export const selectShippingPrice = (state) => state.order.shippingPrice;
export const selectPaymentMethod = (state) => state.order.paymentMethod;
export const selectUserOrders = (state) => state.order.userOrders;

export default orderSlice.reducer;
