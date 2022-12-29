import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectOrders, getAllOrdersAsync } from "../../Slices/orderSlice";
import { selectToken } from "../../Slices/userSlice";
import { URL } from "../../data/constants";
import "../user/UserOrders.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const token = useSelector(selectToken);
  const [expandedRowsSub, setExpandedRowsSub] = useState([]);
  const [expandedRowsMain, setExpandedRowsMain] = useState([]);

  useEffect(() => {
    dispatch(getAllOrdersAsync(token));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const collapseAll = () => {
    setExpandedRowsSub([]);
    setExpandedRowsMain([]);
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
    if (+rowData.shipping_price === +4.63) {
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

  const allowExpansionSub = (rowData) => {
    return !!rowData.order_details;
  };

  const allowExpansionMain = (rowData) => {
    return !!rowData.delivery_details;
  };

  const headerSub = (
    <div className="table-header">
      <h5 style={{ textAlign: "center" }} className="mx-0 my-1">
        Order Products
      </h5>
    </div>
  );

  const rowExpansionSub = (data) => {
    return (
      <div className="orders-subtable">
        <DataTable
          value={data.order_details}
          responsiveLayout="scroll"
          header={headerSub}
        >
          <Column expander={allowExpansionSub} style={{ width: "3em" }} />
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

  const headerMain = (
    <div className="table-header">
      <h5 style={{ textAlign: "center" }} className="mx-0 my-1">
        Delivery Details
      </h5>
    </div>
  );

  const rowExpansionMain = (data) => {
    return (
      <div className="orders-subtable">
        <DataTable
          value={[data]}
          responsiveLayout="scroll"
          expandedRows={expandedRowsSub}
          onRowToggle={(e) => setExpandedRowsSub(e.data)}
          rowExpansionTemplate={(data) => rowExpansionSub(data)}
          header={headerMain}
        >
          <Column expander={allowExpansionSub} style={{ width: "3em" }} />
          <Column
            field="delivery_details.first_name"
            header="First Name"
          ></Column>
          <Column
            field="delivery_details.last_name"
            header="Last Name"
          ></Column>
          <Column field="delivery_details.mobile_phone" header="Phone"></Column>
          <Column field="user.email" header="Email" />
          <Column field="delivery_details.country" header="Country"></Column>
          <Column field="delivery_details.city" header="City"></Column>
          <Column field="delivery_details.zip" header="Postal Code"></Column>
        </DataTable>
      </div>
    );
  };

  const header = (
    <div className="table-header-container">
      <h5 style={{ textAlign: "center" }} className="mx-0 my-1">
        Manage Orders
      </h5>
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
      <div className="card" style={{ maxWidth: "100%", minHeight: "100vh" }}>
        <DataTable
          value={orders}
          expandedRows={expandedRowsMain}
          onRowToggle={(e) => setExpandedRowsMain(e.data)}
          responsiveLayout="scroll"
          rowExpansionTemplate={rowExpansionMain}
          dataKey="_id"
          header={header}
        >
          <Column expander={allowExpansionMain} style={{ width: "3em" }} />
          <Column field="_id" header="Order" />
          <Column field="user.username" header="Username" />
          <Column
            field="quantity"
            header="Itmes Amount"
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

export default Orders;
