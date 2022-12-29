import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserOrders, getUserOrdersAsync } from "../../Slices/orderSlice";
import { selectToken } from "../../Slices/userSlice";
import { URL } from "../../data/constants";
import "./UserOrders.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Badge } from "primereact/badge";

const UserOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const token = useSelector(selectToken);
  const [expandedRows, setExpandedRows] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    dispatch(getUserOrdersAsync(token));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onRowExpand = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Order Expanded",
      life: 1000,
    });
  };

  const onRowCollapse = (event) => {
    toast.current.show({
      severity: "success",
      summary: "Order Collapsed",
      life: 1000,
    });
  };

  const expandAll = () => {
    let _expandedRows = {};

    orders.forEach((p) => (_expandedRows[`${p._id}`] = true));
    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows([]);
  };

  const priceBody = (rowData) => {
    return `$${+rowData.product.price}`;
  };

  const imageBody = (rowData) => {
    return (
      <img
        src={URL + rowData.product.image.image}
        alt={rowData.product.name}
        className="product-image"
      />
    );
  };

  const shippingTypeBody = (rowData) => {
    if (+rowData.shipping_price === 4.63) {
      return `Standard - $${rowData.shipping_price}
      (10 – 30 days)`;
    }
    if (+rowData.shipping_price === 23.84) {
      return `FedEx - $${rowData.shipping_price} 
      (7 – 15 days)`;
    }
    return "Free (15 – 45 days)";
  };

  const itemsQuantityBody = (rowData) => {
    return rowData.order_details.length;
  };

  const dateFormatedBody = (rowData) => {
    let tempDate = new Date(rowData.created_at);
    let year = tempDate.getFullYear();
    let month = tempDate.getMonth() + 1;
    let dt = tempDate.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${
      dt < 10 ? "0" + dt : dt
    }`;
  };

  const orderTotalBdoy = (rowData) => {
    return `$${+rowData.total + +rowData.shipping_price}`;
  };

  const sizeBody = (rowData) => {
    return (
      <Badge
        value={rowData.product.size}
        severity="success"
        className="mr-2"
      ></Badge>
    );
  };

  const allowExpansion = (rowData) => {
    return rowData.order_details.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="orders-subtable">
        <DataTable value={data.order_details} responsiveLayout="scroll">
          <Column field="product.name" header="Name" sortable></Column>
          <Column header="Image" body={imageBody}></Column>
          <Column field="quantity" header="Quantity"></Column>
          <Column header="Size" body={sizeBody}></Column>
          <Column header="Price" body={priceBody} sortable></Column>
          <Column field="product.type" header="Type" sortable></Column>
          <Column
            field="product.gender_category"
            header="Category"
            sortable
          ></Column>
        </DataTable>
      </div>
    );
  };

  const header = (
    <div className="table-header-container">
      <Button
        icon="pi pi-plus"
        label="Expand All"
        className="p-button-raised p-button-info p-button-text"
        onClick={expandAll}
        style={{ marginRight: "10px" }}
      />
      <Button
        icon="pi pi-minus"
        label="Collapse All"
        className="p-button-raised p-button-help p-button-text"
        onClick={collapseAll}
      />
    </div>
  );

  return (
    <div className="datatable-rowexpansion-demo">
      <Toast ref={toast} />
      <div className="card" style={{ maxWidth: "100%", minHeight: "100vh" }}>
        <DataTable
          value={orders}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
          responsiveLayout="scroll"
          rowExpansionTemplate={rowExpansionTemplate}
          dataKey="_id"
          header={header}
        >
          <Column expander={allowExpansion} style={{ width: "3em" }} />
          <Column field="_id" header="Order" />
          <Column
            field="quantity"
            header="Quantity"
            sortable
            body={itemsQuantityBody}
          />
          <Column
            field="shipping"
            header="Shipping"
            sortable
            body={shippingTypeBody}
          />
          <Column field="payment_method" header="Payment" />
          <Column
            field="created_at"
            header="Date"
            sortable
            body={dateFormatedBody}
          />
          <Column field="total" header="Total" sortable body={orderTotalBdoy} />
        </DataTable>
      </div>
    </div>
  );
};

export default UserOrders;
