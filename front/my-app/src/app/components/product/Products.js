import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Products.css";
import { URL } from "../../data/constants";
import {
  getProductsByCategoryAsync,
  selectProductsByCategory,
  selectStatus,
} from "../../Slices/productSlice";

import Loader from "../layout/Loader";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

const Products = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectProductsByCategory);
  const status = useSelector(selectStatus);
  const [basicModal, setBasicModal] = useState(false);

  const navProduct = (name) => {
    //navigates to particular product opens a modal window with it
    navigate(name);
    setShow();
  };

  const setShow = () => {
    setBasicModal(!basicModal);
  };

  const setClose = () => {
    setBasicModal(!basicModal);
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getProductsByCategoryAsync(params.products_category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.products_category]);

  if (status === "loading") {
    return <Loader />;
  } else {
    return (
      <div style={{ minHeight: "100vh" }}>
        <div className="d-flex flex-wrap">
          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
            <MDBModalDialog centered size="lg">
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

                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={setClose}>
                    Close
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
          {products.map((product, index) => (
            <MDBCard className="mr-auto col-3 text-center" key={index}>
              <div className="bg-image hover-zoom">
                <MDBCardImage
                  src={URL + product.image.image}
                  position="top"
                  alt={product.name}
                  className="w-100"
                />
              </div>
              <MDBCardBody>
                <MDBCardText>{product.name}</MDBCardText>
                <MDBCardTitle>{product.price}$</MDBCardTitle>
                <MDBBtn onClick={() => navProduct(product.name)}>
                  More Details
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          ))}
        </div>
      </div>
    );
  }
};

export default Products;
