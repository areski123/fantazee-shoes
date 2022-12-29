import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GooglePayButton from "@google-pay/button-react";
import { useNavigate } from "react-router-dom";
import {
  selectOrderTotal,
  selectShippingPrice,
  setPaymentMethod,
} from "../../Slices/orderSlice";
import { CURRENCY_CODE } from "../../data/constants";

const GooglePayCheckoutButton = () => {
  const orderTotal = useSelector(selectOrderTotal);
  const price = useSelector(selectShippingPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleApprove = (method) => {
    dispatch(setPaymentMethod(method));
    navigate("/success");
  };

  return (
    <div>
      <GooglePayButton
        environment="TEST"
        buttonSizeMode="fill"
        buttonColor="default"
        buttonType="buy"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "12345678901234567890",
            merchantName: "Demo Merchant",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: `${orderTotal + price}`,
            currencyCode: CURRENCY_CODE,
            countryCode: "US",
          },
          callbackIntents: ["PAYMENT_AUTHORIZATION"],
        }}
        onPaymentAuthorized={(paymentData) => {
          handleApprove("google pay");
          return { transactionState: "SUCCESS" };
        }}
      ></GooglePayButton>
    </div>
  );
};

export default GooglePayCheckoutButton;
