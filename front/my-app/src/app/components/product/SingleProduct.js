import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader";
import { URL } from "../../data/constants";
import {
  getProductsByNameAsync,
  selectProductsByName,
  selectSizes,
  selectSingleProduct,
} from "../../Slices/productSlice";
import { setCart } from "../../Slices/cartSlice";
import { SelectButton } from "primereact/selectbutton";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Form } from "react-bootstrap";

const SingleProduct = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectProductsByName);
  const sizes = useSelector(selectSizes);
  const singleProduct = useSelector(selectSingleProduct);

  const [status, setStatus] = useState(false);
  const [productCart, setProductCart] = useState([]);
  const [productQuantity, setProductQuantity] = useState("");
  const [size, setSize] = useState("");

  const getProductForCart = (value) => {
    let product = products.find((prod) => prod.size === value);
    setProductCart(product);
  };

  const addToCart = (e) => {
    e.preventDefault();
    if (
      typeof productCart === "object" &&
      productCart !== null &&
      !Array.isArray(productCart)
    ) {
      dispatch(setCart([productCart, productQuantity]));
      setProductCart([]);
      setProductQuantity("");
      setSize("");
    }
  };

  const selectBySize = (e) => {
    e.preventDefault();
    if (e.target.value) {
      getProductForCart(e.target.value);
    } else {
      setProductCart([]);
    }
    setSize(e.target.value);
  };

  const handleProductQuantity = (e) => {
    e.preventDefault();
    setProductQuantity(e.target.value);
  };

  useEffect(() => {
    dispatch(getProductsByNameAsync(params));
    setTimeout(() => {
      setStatus(true);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!status) {
    return <Loader />;
  } else {
    return (
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="4">
            <MDBCardImage
              className="figure-img img-fluid rounded shadow-3"
              src={URL + singleProduct.image.image}
              alt={singleProduct.name}
            />
          </MDBCol>
          <MDBCol md="8">
            <MDBCardBody>
              <MDBCardTitle>{singleProduct.name}</MDBCardTitle>
              <MDBCardText>{singleProduct.description}</MDBCardText>
              <MDBCardTitle>Price:</MDBCardTitle>
              <MDBCardText>
                <big>${singleProduct.price}</big>
              </MDBCardText>
            </MDBCardBody>
          </MDBCol>
          <Form onSubmit={addToCart}>
            <MDBCol md="12">
              <MDBCardTitle>Sizes</MDBCardTitle>
              <FormControl>
                <SelectButton
                  options={sizes}
                  value={size}
                  required
                  onChange={selectBySize}
                />
              </FormControl>
            </MDBCol>
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel id="count_in_stock">Quantity</InputLabel>
              <Select
                labelId="count_in_stock"
                id="count_in_stock"
                value={productQuantity}
                label="Quantity"
                required
                disabled={!size}
                onChange={handleProductQuantity}
              >
                {[...Array(productCart.count_in_stock).keys()].map((x) => (
                  <MenuItem key={x + 1} value={x + 1}>
                    {x + 1}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Choose quantity</FormHelperText>
            </FormControl>
            <MDBCol style={{ margin: "10px" }}>
              <MDBBtn type="submit">Add to cart</MDBBtn>
            </MDBCol>
          </Form>
        </MDBRow>
      </MDBCard>
    );
  }
};
export default SingleProduct;
