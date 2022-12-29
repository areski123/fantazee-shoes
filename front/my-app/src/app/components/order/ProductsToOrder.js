import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCart } from "../../Slices/cartSlice";
import {
  selectProductToOrder,
  selectOrderTotal,
  setOrderProduct,
} from "../../Slices/orderSlice";
import { URL } from "../../data/constants";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import "./ProductsToOrder.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.css";

const ProductsToOrder = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const cart = useSelector(selectCart);
  const orderTotal = useSelector(selectOrderTotal);
  const product = useSelector(selectProductToOrder);
  const dispatch = useDispatch();

  const onSelectionChange = (event) => {
    setSelectedProducts(event.value);
    dispatch(setOrderProduct(event.value));
    setSelectAll(event.value.length === cart.length);
  };

  const onSelectAllChange = (event) => {
    //if all products in the cart have been selected
    if (event.checked) {
      setSelectAll(true);
      setSelectedProducts(cart);
      dispatch(setOrderProduct(cart));
    } else {
      setSelectAll(false);
      setSelectedProducts([]);
      dispatch(setOrderProduct([]));
    }
  };

  useEffect(() => {
    setSelectedProducts(product);
  }, [product]);

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={URL + rowData.productCart.image.image}
        alt={rowData.productCart.name}
        className="product-image"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return `$${rowData.productCart.price}`;
  };

  const sizeBodyTemplate = (rowData) => {
    return (
      <Badge
        value={rowData.productCart.size}
        className="mr-2"
        severity="success"
        size="large"
      ></Badge>
    );
  };

  const header = (
    <div className="table-header">Choose shoes from your cart</div>
  );
  const footer = `Total: ${orderTotal}$`;

  return (
    <div className="datatable-templating-demo">
      <div className="card">
        <DataTable
          value={cart}
          header={header}
          footer={footer}
          responsiveLayout="scroll"
          selection={selectedProducts}
          onSelectionChange={onSelectionChange}
          selectAll={selectAll}
          onSelectAllChange={onSelectAllChange}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3em" }}
          ></Column>
          <Column field="productCart.name" header="Name"></Column>
          <Column field="productCart.brand" header="Brand"></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column field="productQuantity" header="Quantity"></Column>
          <Column header="Price" body={priceBodyTemplate}></Column>
          <Column
            field="productCart.gender_category"
            header="Category"
          ></Column>
          <Column header="Size" body={sizeBodyTemplate}></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default ProductsToOrder;
