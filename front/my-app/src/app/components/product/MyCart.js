import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL } from "../../data/constants";
import { selectLogged } from "../../Slices/userSlice";
import {
  changeStatus,
  selectCartShownStatus,
  selectCart,
  selectTotal,
  removeItem,
  deleteItem,
} from "../../Slices/cartSlice";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBadge,
  MDBTable,
  MDBTableBody,
  MDBIcon,
} from "mdb-react-ui-kit";


const MyCart = () => {
  const status = useSelector(selectCartShownStatus);
  const cart = useSelector(selectCart);
  const total = useSelector(selectTotal);
  const logged = useSelector(selectLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navCart = () => {
    dispatch(changeStatus(!status));
    if (logged) {
      navigate("/order");
    } else {
      navigate("/login");
    }
  };

  return (
    <MDBModal staticBackdrop show={status} tabIndex="-1">
      <MDBModalDialog size="lg">
        <MDBModalContent>
          <MDBModalHeader className="bg-info text-white">
            <MDBModalTitle>Product in the cart</MDBModalTitle>
            <MDBBtn
              color="none"
              className="btn-close btn-close-white"
              onClick={() => dispatch(changeStatus(!status))}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody style={{ padding: 0 }}>
            {!cart.length > 0 ? (
              <div style={{ textAlign: "center" }}>
                <h1 style={{ color: "black" }}>Empty Cart</h1>
              </div>
            ) : (
              <MDBTable style={{ margin: 0, padding: 0 }}>
                <MDBTableBody style={{ padding: 0 }}>
                  {cart.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={URL + product.productCart.image.image}
                            alt={product.productCart.name}
                            style={{
                              width: "45px",
                              height: "45px",
                              marginTop: 15,
                            }}
                            className="rounded-circle"
                          />
                        </div>
                      </td>
                      <td>
                        <p className="fw-bold mb-1">
                          {product.productCart.name}
                        </p>
                      </td>

                      <td>
                        <div
                          className="d-flex align-items-center"
                          style={{ marginTop: 20 }}
                        >
                          <h5>
                            <MDBBadge color="success" pill>
                              {product.productCart.size}
                            </MDBBadge>
                          </h5>
                        </div>
                      </td>
                      <td>
                        <h6 style={{ textAlign: "center" }}>
                          {product.productQuantity}
                        </h6>
                        <h6 style={{ textAlign: "center" }}>
                          {product.productCart.price}$
                        </h6>
                      </td>
                      <td>
                        <MDBBtn
                          color="warning"
                          className="m-1"
                          onClick={() =>
                            dispatch(removeItem(product.productCart._id))
                          }
                        >
                          <MDBIcon fas icon="minus" />
                        </MDBBtn>
                        <MDBBtn
                          color="danger"
                          className="m-1"
                          onClick={() =>
                            dispatch(
                              deleteItem([
                                product.productCart._id,
                                product.subtotal,
                              ])
                            )
                          }
                        >
                          <MDBIcon far icon="trash-alt" />
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            )}
          </MDBModalBody>
          <h3 style={{ color: "black" }}>Total: {total}$</h3>
          <MDBModalFooter>
            <MDBBtn color="info" onClick={navCart} disabled={!cart.length > 0}>
              Sent to order
            </MDBBtn>
            <MDBBtn
              outline
              color="info"
              onClick={() => dispatch(changeStatus(!status))}
            >
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default MyCart;
