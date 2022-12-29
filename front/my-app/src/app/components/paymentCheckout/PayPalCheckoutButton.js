import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  selectProductToOrder,
  selectOrderTotal,
  selectShippingPrice,
  setPaymentMethod,
} from "../../Slices/orderSlice";
import { CURRENCY_CODE } from "../../data/constants";

const PayPalCheckoutButton = () => {
  const orderTotal = useSelector(selectOrderTotal);
  const products = useSelector(selectProductToOrder);
  const [order, setOrder] = useState([]);
  const price = useSelector(selectShippingPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleApprove = (orderID, order) => {
    dispatch(setPaymentMethod("paypal"));
    navigate("/success");
  };

  useEffect(() => {
    //iterates over products sent to order and creates the format specified by paypal
    setOrder(
      products.map((prod) => ({
        name: prod.productCart.name,
        description: `Size - ${prod.productCart.size}, ${prod.productCart.type}`,
        unit_amount: {
          currency_code: CURRENCY_CODE,
          value: prod.productCart.price,
        },
        quantity: `${prod.productQuantity}`,
        category: "PHYSICAL_GOODS",
      }))
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PayPalButtons
        style={{
          layout: "horizontal",
          height: 45,
          tagline: "",
          shape: "pill",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: CURRENCY_CODE,
                  value: `${orderTotal + price}`,
                  breakdown: {
                    item_total: {
                      currency_code: CURRENCY_CODE,
                      value: `${orderTotal}`,
                    },
                    shipping: {
                      currency_code: CURRENCY_CODE,
                      value: price,
                    },
                  },
                },
                items: order,
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          handleApprove(data.orderID, order);
        }}
      />
    </div>
  );
};

export default PayPalCheckoutButton;
