import React from "react";
import { useState, useEffect, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import "./CreditCardPayment.css";
import { IMaskInput, IMask } from "react-imask";
import {
  SVG_CREDIT_CART_ICONS,
  XLINK,
  XMLNS,
} from "../../assets/creditCardSvg";
import { creditCartMask } from "../../data/creditCartMask";
import { validationSchemaCredit } from "../../data/validation";
import { setPaymentMethod } from "../../Slices/orderSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreditCardPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [holderName, setHolderName] = useState("");
  const [cardNumber, setcardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPreload, setIsPreload] = useState(true);
  const [paymentType, setPaymentType] = useState("");
  const [open, setOpen] = useState(true);

  const formOptions = {
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchemaCredit),
  };

  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
    setValue,
  } = useForm(formOptions);

  const onSubmit = (data, event) => {
    dispatch(setPaymentMethod(paymentType));
    navigate("/success");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const CustomSnackbar = (props) => {
    return (
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: props.horizontal,
          vertical: props.vertical,
        }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {props.message}
        </Alert>
      </Snackbar>
    );
  };
  //define the color swap function
  const swapColor = function (basecolor) {
    //iterates over all elements on the page with a certain class
    //adds a new class to the already existing class, depending on the type of bank card
    document.querySelectorAll(".lightcolor").forEach(function (input) {
      input.setAttribute("class", "");
      input.setAttribute("class", "lightcolor " + basecolor);
    });
    document.querySelectorAll(".darkcolor").forEach(function (input) {
      input.setAttribute("class", "");
      input.setAttribute("class", "darkcolor " + basecolor + "dark");
    });
  };
  //Generate random card number from list of known test numbers
  const generateRandomCard = () => {
    let testCards = [
      "4000056655665556",
      "5200828282828210",
      "371449635398431",
      "6011000990139424",
      "30569309025904",
      "3566002020360505",
      "6200000000000005",
      "6759649826438453",
    ];
    let randomNumber = Math.floor(Math.random() * testCards.length);
    setcardNumber(testCards[randomNumber]);
  };
  //On Input Change Events
  const handleCardHolder = (event) => {
    setHolderName(event.target.value);
  };

  const handleCardNumber = (value, cardType) => {
    let found = false;
    setPaymentType(cardType);
    setcardNumber(value);
    setValue("cardNumber", value, {
      shouldDirty: true,
      shouldValidate: submitCount > 0,
    });
    SVG_CREDIT_CART_ICONS.forEach((element) => {
      //iterates over all credit card icons and changes the icon depending on the type of card entered
      if (element.cardName === cardType) {
        document.getElementById("creditCartIcon").innerHTML = element.icon;
        document.getElementById("creditCartSingel").innerHTML =
          element.icon_single;
        swapColor(element.color);
        found = true;
      }
      if (!found) {
        //if the number entered does not match any type of credit card, it changes color to grey
        document.getElementById("creditCartIcon").innerHTML = "";
        document.getElementById("creditCartSingel").innerHTML = "";
        swapColor("grey");
      }
    });
  };

  const handleExpirationDate = (value) => {
    setExpirationDate(value);
    setValue("expirationDate", value, {
      shouldDirty: true,
      shouldValidate: submitCount > 0,
    });
  };

  const handleSecurityCode = (value) => {
    setSecurityCode(value);
    setValue("securityCode", value, {
      shouldDirty: true,
      shouldValidate: submitCount > 0,
    });
  };
  //On Focus and Click Events
  const HandleFlipped = (event) => {
    if (event.type === "focus") {
      if (event.target.id !== "securityCode") {
        setIsFlipped(false);
      } else {
        setIsFlipped(true);
      }
    }
    if (event.type === "click") {
      setIsFlipped(!isFlipped);
    }
  };

  useEffect(() => {
    setIsPreload(false);
  }, []);

  useEffect(() => {
    setOpen(true);
  }, [errors]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="credit-payment-page">
          <div className="credit-payment-title">
            <h1>Credit Card Detail</h1>
          </div>
          <div
            className={`credit-payment-container ${
              isPreload ? " preload" : ""
            } `}
          >
            <div
              className={`creditcard${isFlipped ? " flipped" : ""}`}
              onClick={HandleFlipped}
            >
              <div className="front">
                <div id="creditCartSingel"></div>
                <svg
                  version="1.1"
                  id="cardfront"
                  xmlns={XMLNS}
                  xmlnsXlink={XLINK}
                  x="0px"
                  y="0px"
                  viewBox="0 0 750 471"
                  style={{ enableBackground: "new 0 0 750 471" }}
                  xmlSpace="preserve"
                >
                  <g id="Front">
                    <g id="CardBackground">
                      <g id="Page-1_1_">
                        <g id="amex_1_">
                          <path
                            id="Rectangle-1_1_"
                            className="lightcolor grey"
                            d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                            C0,17.9,17.9,0,40,0z"
                          />
                        </g>
                      </g>
                      <path
                        className="darkcolor greydark"
                        d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z"
                      />
                    </g>
                    <text
                      transform="matrix(1 0 0 1 60.106 295.0121)"
                      id="svgnumber"
                      className="st2 st3 st4"
                    >
                      {!cardNumber ? "0123 4567 8910 1112" : cardNumber}
                    </text>
                    <text
                      transform="matrix(1 0 0 1 54.1064 428.1723)"
                      id="svgname"
                      className="st2 st5 st6"
                    >
                      {!holderName ? "Israel Israely" : holderName}
                    </text>
                    <text
                      transform="matrix(1 0 0 1 54.1074 389.8793)"
                      className="st7 st5 st8"
                    >
                      cardholder name
                    </text>
                    <text
                      transform="matrix(1 0 0 1 479.7754 388.8793)"
                      className="st7 st5 st8"
                    >
                      expiration
                    </text>
                    <text
                      transform="matrix(1 0 0 1 65.1054 241.5)"
                      className="st7 st5 st8"
                    >
                      card number
                    </text>
                    <g>
                      <text
                        transform="matrix(1 0 0 1 574.4219 433.8095)"
                        id="svgexpire"
                        className="st2 st5 st9"
                      >
                        {!expirationDate ? "01/23" : expirationDate}
                      </text>
                      <text
                        transform="matrix(1 0 0 1 479.3848 417.0097)"
                        className="st2 st10 st11"
                      >
                        VALID
                      </text>
                      <text
                        transform="matrix(1 0 0 1 479.3848 435.6762)"
                        className="st2 st10 st11"
                      >
                        THRU
                      </text>
                      <polygon
                        className="st2"
                        points="554.5,421 540.4,414.2 540.4,427.9"
                      />
                    </g>
                    <g id="cchip">
                      <g>
                        <path
                          className="st2"
                          d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3
                        c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z"
                        />
                      </g>
                      <g>
                        <g>
                          <rect
                            x={82}
                            y={70}
                            className="st12"
                            width="1.5"
                            height={60}
                          />
                        </g>
                        <g>
                          <rect
                            x="167.4"
                            y={70}
                            className="st12"
                            width="1.5"
                            height={60}
                          />
                        </g>
                        <g>
                          <path
                            className="st12"
                            d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3
                            c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3
                            C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5
                            c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5
                            c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z"
                          />
                        </g>
                        <g>
                          <rect
                            x="82.8"
                            y="82.1"
                            className="st12"
                            width="25.8"
                            height="1.5"
                          />
                        </g>
                        <g>
                          <rect
                            x="82.8"
                            y="117.9"
                            className="st12"
                            width="26.1"
                            height="1.5"
                          />
                        </g>
                        <g>
                          <rect
                            x="142.4"
                            y="82.1"
                            className="st12"
                            width="25.8"
                            height="1.5"
                          />
                        </g>
                        <g>
                          <rect
                            x={142}
                            y="117.9"
                            className="st12"
                            width="26.2"
                            height="1.5"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                  <g id="Back" />
                </svg>
              </div>
              <div className="back">
                <svg
                  version="1.1"
                  id="cardback"
                  xmlns={XMLNS}
                  xmlnsXlink={XLINK}
                  x="0px"
                  y="0px"
                  viewBox="0 0 750 471"
                  style={{ enableBackground: "new 0 0 750 471" }}
                  xmlSpace="preserve"
                >
                  <g id="Front">
                    <line
                      className="st0"
                      x1="35.3"
                      y1="10.4"
                      x2="36.7"
                      y2="11"
                    />
                  </g>
                  <g id="Back">
                    <g id="Page-1_2_">
                      <g id="amex_2_">
                        <path
                          id="Rectangle-1_2_"
                          className="darkcolor greydark"
                          d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                  C0,17.9,17.9,0,40,0z"
                        />
                      </g>
                    </g>
                    <rect y="61.6" className="st2" width="750" height="78" />
                    <g>
                      <path
                        className="st3"
                        d="M701.1,249.1H48.9c-3.3,0-6-2.7-6-6v-52.5c0-3.3,2.7-6,6-6h652.1c3.3,0,6,2.7,6,6v52.5
              C707.1,246.4,704.4,249.1,701.1,249.1z"
                      />
                      <rect
                        x="42.9"
                        y="198.6"
                        className="st4"
                        width="664.1"
                        height="10.5"
                      />
                      <rect
                        x="42.9"
                        y="224.5"
                        className="st4"
                        width="664.1"
                        height="10.5"
                      />
                      <path
                        className="st5"
                        d="M701.1,184.6H618h-8h-10v64.5h10h8h83.1c3.3,0,6-2.7,6-6v-52.5C707.1,187.3,704.4,184.6,701.1,184.6z"
                      />
                    </g>
                    <text
                      transform="matrix(1 0 0 1 621.999 227.2734)"
                      className="st6 st7"
                    >
                      {!securityCode ? "985" : securityCode}
                    </text>
                    <g className="st8">
                      <text
                        transform="matrix(1 0 0 1 518.083 280.0879)"
                        className="st9 st6 st10"
                      >
                        security code
                      </text>
                    </g>
                    <rect
                      x="58.1"
                      y="378.6"
                      className="st11"
                      width="375.5"
                      height="13.5"
                    />
                    <rect
                      x="58.1"
                      y="405.6"
                      className="st11"
                      width="421.7"
                      height="13.5"
                    />
                    <text
                      transform="matrix(1 0 0 1 59.5073 228.6099)"
                      className="st12 st13"
                    >
                      {!holderName ? "Israel Israely" : holderName}
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div className="credit-payment-form">
            <div className="credit-payment-field">
              <label className="credit-payment-label" htmlFor="holderName">
                Name
              </label>
              <input
                aria-describedby=""
                className="credit-payment-input"
                id="holderName"
                name="holderName"
                maxLength={20}
                {...register("holderName")}
                autoComplete="off"
                value={holderName}
                onChange={handleCardHolder}
                onFocus={HandleFlipped}
              />
              <ErrorMessage
                errors={errors}
                name="holderName"
                render={({ message }) => (
                  <CustomSnackbar
                    message={message}
                    vertical="top"
                    horizontal="center"
                  />
                )}
              />
            </div>
            <div className="credit-payment-field">
              <label className="credit-payment-label" htmlFor="cardNumber">
                Card Number
              </label>
              <span onClick={generateRandomCard} id="generatecard">
                generate random
              </span>
              <IMaskInput
                className="credit-payment-input"
                id="cardNumber"
                name="cardNumber"
                mask={creditCartMask}
                dispatch={(appended, dynamicMasked) => {
                  var number = (dynamicMasked.value + appended).replace(
                    /\D/g,
                    ""
                  );
                  for (var i = 0; i < dynamicMasked.compiledMasks.length; i++) {
                    let re = new RegExp(
                      dynamicMasked.compiledMasks[i].startsWith
                    );
                    if (number.match(re) != null) {
                      return dynamicMasked.compiledMasks[i];
                    }
                  }
                }}
                value={cardNumber}
                onAccept={(value, mask) =>
                  handleCardNumber(value, mask.masked.currentMask.cardtype)
                }
                onFocus={HandleFlipped}
              />
              <ErrorMessage
                errors={errors}
                name="cardNumber"
                render={({ message }) => (
                  <CustomSnackbar
                    message={message}
                    vertical="bottom"
                    horizontal="center"
                  />
                )}
              />
              <svg
                id="creditCartIcon"
                className="creditCartIcon"
                width="750"
                height="471"
                viewBox="0 0 750 471"
                version="1.1"
                xmlns={XMLNS}
                xmlnsXlink={XLINK}
              ></svg>
            </div>
            <div className="credit-payment-field">
              <label className="credit-payment-label" htmlFor="expirationDate">
                Expiration (mm/yy)
              </label>
              <IMaskInput
                className="credit-payment-input"
                id="expirationDate"
                name="expirationDate"
                mask={[
                  {
                    mask: "MM{/}YY",
                    blocks: {
                      MM: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 12,
                      },
                      YY: {
                        mask: IMask.MaskedRange,
                        from: +new Date().getFullYear().toString().substring(2),
                        to: 99,
                      },
                    },
                  },
                ]}
                onAccept={(value, mask) => handleExpirationDate(value)}
                onFocus={HandleFlipped}
              />
              <ErrorMessage
                errors={errors}
                name="expirationDate"
                render={({ message }) => (
                  <CustomSnackbar
                    message={message}
                    vertical="bottom"
                    horizontal="left"
                  />
                )}
              />
            </div>
            <div className="credit-payment-field">
              <label className="credit-payment-label" htmlFor="securityCode">
                Security Code
              </label>
              <IMaskInput
                className="credit-payment-input"
                id="securityCode"
                name="securityCode"
                mask="0000"
                onAccept={(value, mask) => handleSecurityCode(value)}
                onFocus={HandleFlipped}
              />
              <ErrorMessage
                errors={errors}
                name="securityCode"
                render={({ message }) => (
                  <CustomSnackbar
                    message={message}
                    vertical="top"
                    horizontal="left"
                  />
                )}
              />
            </div>
          </div>
          <button className="credit-payment-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CreditCardPayment;
