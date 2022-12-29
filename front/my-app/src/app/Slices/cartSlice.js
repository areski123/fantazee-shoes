import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  total: 0,
  cartShownStatus: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.cartShownStatus = action.payload;
    },
    setCart: (state, action) => {
      let productCart = action.payload[0];
      let productQuantity = action.payload[1];
      let subtotal = productQuantity * productCart.price;
      console.log(subtotal)
      let allow = true;
      state.cart.forEach((element) => {
        //Checks if there is already a product in the cart with this id
        if (element.productCart._id === productCart._id) {
          // Checks if the quantity of the given product and the selected quantity is less than the quantity in stock
          if (
            element.productCart.count_in_stock >=
            element.productQuantity + productQuantity
          ) {
            //updates the product quantity and updates the total
            element.productQuantity += productQuantity;
            state.total += subtotal;
            allow = false;
          } else {
            allow = false;
            return;
          }
        }
      });
      //if this product was not in the cart, it adds a new product
      if (allow) {
        state.cart.push({
          productCart: productCart,
          productQuantity: productQuantity,
          subtotal: subtotal,
        });
        state.total += subtotal;
      }
    },
    removeItem: (state, action) => {
      let id = action.payload;
      state.cart.forEach((element) => {
        if (element.productCart._id === id) {
          //if the quantity of the product is more than one, then it takes away
          if (element.productQuantity > 1) {
            element.productQuantity -= 1;
            element.subtotal -= element.productCart.price;
            state.total -= element.productCart.price;
          }
          //removes a product from the cart
          else {
            state.total -= element.productCart.price;
            state.cart = state.cart.filter(
              (product) => product.productCart._id !== id
            );
          }
        }
      });
    },
    deleteItem: (state, action) => {
      //removes a product from the cart
      let id = action.payload[0];
      let subtotal = action.payload[1];
      state.total -= subtotal;
      state.cart = state.cart.filter(
        (product) => product.productCart._id !== id
      );
    },
    resetCart: (state, action) => {
      //if the user order of products is less than what is in the basket, then it takes away the ordered products
      state.total -= action.payload.orderTotal;
      state.cart = state.cart.filter(
        (itemCart) =>
          !action.payload.order.find(
            //if the product id in the order matches the product id in the cart deletes it
            (itemOrder) =>
              itemOrder.productCart._id === itemCart.productCart._id
          )
      );
    },
  },
});

export const { changeStatus, setCart, removeItem, deleteItem, resetCart } =
  cartSlice.actions;
export const selectStatus = (state) => state.cart.status;
export const selectCartShownStatus = (state) => state.cart.cartShownStatus;
export const selectCart = (state) => state.cart.cart;
export const selectTotal = (state) => state.cart.total;

export default cartSlice.reducer;
