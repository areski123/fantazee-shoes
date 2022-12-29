import React from "react";
import { useEffect } from "react";
import "./Success.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectToken, selectUserName } from "../../Slices/userSlice";
import { resetCart } from "../../Slices/cartSlice";
import {
  selectOrderTotal,
  selectShippingPrice,
  selectProductToOrder,
  selectDeliveryDetails,
  selectPaymentMethod,
  sendOrderAsync,
} from "../../Slices/orderSlice";

const Success = () => {
  const token = useSelector(selectToken);
  const userName = useSelector(selectUserName);
  const products = useSelector(selectProductToOrder);
  const price = useSelector(selectShippingPrice);
  const payment = useSelector(selectPaymentMethod);
  const delivery = useSelector(selectDeliveryDetails);
  const itemsTotal = useSelector(selectOrderTotal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (payment) {
      dispatch(
        sendOrderAsync({
          token: token,
          cart: products,
          deliveryDetails: delivery,
          shippingPrice: price,
          total: price + itemsTotal,
          paymentMethod: payment,
        })
      );
      dispatch(resetCart({ orderTotal: itemsTotal, order: products }));
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="success-container">
      <div className="wrapperAlert">
        <div className="contentAlert">
          <div className="topHalf">
            <p className="success-text-top">
              <svg
                className="success-svg"
                viewBox="0 0 512 512"
                width="100"
                title="check-circle"
              >
                <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
              </svg>
            </p>
            <h1 className="success-header">{`Thank you ${userName}`}</h1>
            <ul className="bg-bubbles">
              <li className="success-bubbles"></li>
              <li className="success-bubbles"></li>
              <li className="success-bubbles"></li>
              <li className="success-bubbles"></li>
              <li className="success-bubbles"></li>
              <li className="success-bubbles"></li>
              <li className="success-bubbles"></li>
              <li className="success-bubbles"></li>
              <li className="success-bubbles"></li>
              <li className="success-bubbles"></li>
            </ul>
          </div>
          <div className="bottomHalf">
            <p className="success-text-bottom">
              Your order in ETHEREAL SHOES has been successfully placed!
            </p>
            <button
              className="success-button-page"
              onClick={() => navigate("/")}
            >
              Back Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
