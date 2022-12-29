import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import App from "./App";
import Login from "./app/components/user/Login";
import Register from "./app/components/user/Register";
import Home from "./app/components/layout/Home";
import Products from "./app/components/product/Products";
import SingleProduct from "./app/components/product/SingleProduct";
import OrderStepper from "./app/components/order/OrderStepper";
import CreditCardPayment from "./app/components/paymentCheckout/CreditCardPayment";
import Success from "./app/components/order/Success";
import UserOrders from "./app/components/user/UserOrders";
import AdminLayout from "./app/components/admin/AdminLayout";
import ProductsAdmin from "./app/components/admin/ProductsAdmin";
import Orders from "./app/components/admin/Orders";
import Users from "./app/components/admin/Users";
import Error from "./app/components/layout/Error";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PayPalScriptProvider
        options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="products/:products_category" element={<Products />}>
                <Route path=":name" element={<SingleProduct />} />
              </Route>
              <Route path="/order" element={<OrderStepper />}>
                <Route path="payment" element={<CreditCardPayment />} />
              </Route>
              <Route path="/userorders" element={<UserOrders />} />
              <Route path="/success" element={<Success />} />
              <Route exact path="/admin" element={<AdminLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="orders" element={<Orders />} />
                <Route path="users" element={<Users />} />
              </Route>
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PayPalScriptProvider>
    </PersistGate>
  </Provider>
);

reportWebVitals();
