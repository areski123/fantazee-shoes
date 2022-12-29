import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardIcon from "../../assets/credit-card.svg";
import PayPalCheckoutButton from "./PayPalCheckoutButton";
import GooglePayCheckoutButton from "./GooglePayCheckoutButton";
import { URL } from "../../data/constants";
import { useNavigate, Outlet } from "react-router-dom";
import "./PaymentCheckout.css";
import {
  selectOrderTotal,
  selectShippingPrice,
  selectProductToOrder,
  setShipingPrice,
} from "../../Slices/orderSlice";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
} from "mdb-react-ui-kit";

export default function PaymentCheckout() {
  const products = useSelector(selectProductToOrder);
  const dispatch = useDispatch();
  const price = useSelector(selectShippingPrice);
  const itemsTotal = useSelector(selectOrderTotal);
  const navigate = useNavigate();
  const [optModal, setOptModal] = useState(false);

  const handleShippingPrice = (event) => {
    dispatch(setShipingPrice(+event.target.value));
  };

  const navPament = (page) => {
    navigate(page);
    setShow();
  };

  const setShow = () => {
    setOptModal(!optModal);
  };

  const setClose = () => {
    setOptModal(!optModal);
    navigate(-1);
  };

  return (
    <section className="h-100 h-custom" style={{ marginTop: 20 }}>
      <MDBModal show={optModal} tabIndex="-1" setShow={setOptModal}>
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={setClose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <Outlet />
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                      Your products
                    </h3>
                    {products.map((product, index) => (
                      <MDBCard className="mb-3" key={index}>
                        <MDBCardBody>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <MDBCardImage
                                  src={
                                    URL + product.productCart.image.image
                                  }
                                  fluid
                                  className="rounded-3"
                                  style={{ width: "65px" }}
                                  alt="Shopping item"
                                />
                              </div>
                              <div className="ms-3">
                                <MDBTypography tag="h5">
                                  {product.productCart.name}
                                </MDBTypography>
                                <p className="small mb-0">{`${product.productCart.type}, ${product.productCart.size}`}</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: "50px" }}>
                                <MDBTypography
                                  tag="h5"
                                  className="fw-normal mb-0"
                                >
                                  {product.productQuantity}
                                </MDBTypography>
                              </div>
                              <div style={{ width: "80px" }}>
                                <MDBTypography tag="h5" className="mb-0">
                                  ${product.subtotal}
                                </MDBTypography>
                              </div>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    ))}
                  </MDBCol>

                  <MDBCol lg="5">
                    <MDBCard className="bg rounded-3">
                      <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                        Payment
                      </h3>
                      <MDBCardBody>
                        <div className="d-flex justify-content-between mb-4">
                          <MDBTypography tag="h5" className="text-uppercase">
                            items
                          </MDBTypography>
                          <MDBTypography tag="h5">$ {itemsTotal}</MDBTypography>
                        </div>
                        <MDBTypography tag="h5" className="text-uppercase mb-3">
                          Shipping
                        </MDBTypography>

                        <div className="mb-4 pb-2">
                          <select
                            className="select p-2 rounded bg-grey"
                            style={{ width: "80%" }}
                            onChange={handleShippingPrice}
                          >
                            <option value={0}>Free (15 – 45 days)</option>
                            <option value={4.63}>
                              Standard - $4.63 (10 – 30 days)
                            </option>
                            <option value={23.84}>
                              FedEx - $23.84 (7 – 15 days)
                            </option>
                          </select>
                          <div className="separator"></div>
                          <div className="d-flex justify-content-between mb-5">
                            <MDBTypography tag="h5" className="text-uppercase">
                              Total price
                            </MDBTypography>
                            <MDBTypography tag="h5">
                              $ {itemsTotal + price}
                            </MDBTypography>
                          </div>
                        </div>
                        <div className="checkout">
                          <button
                            onClick={() => navPament("payment")}
                            className="checkout-button"
                          >
                            <div className="grey-circle">
                              <div className="purple-circle">
                                <img
                                  className="icon"
                                  src={CardIcon}
                                  alt="credit-card-icon"
                                />
                              </div>
                            </div>
                            <div className="text-container">
                              <p className="text">Buy</p>
                            </div>
                          </button>
                          <div className="separator"></div>
                          <div className="payment">
                            <div className="payment-button-container">
                              <PayPalCheckoutButton />
                            </div>
                          </div>
                          <div className="separator"></div>
                          <div className="payment">
                            <div className="payment-button-container">
                              <GooglePayCheckoutButton />
                            </div>
                          </div>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
