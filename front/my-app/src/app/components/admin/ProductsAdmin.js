import React from "react";
import { useState, useEffect, useRef,  } from "react";
import { URL } from "../../data/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProductsAsync,
  selectAllProducts,
  deleteProductAsync,
} from "../../Slices/productSlice";
import { selectToken } from "../../Slices/userSlice";
import NewProduct from "./NewProduct";
import ProductImage from "./ProductImage";
import ProductsSize from "./ProductsSize";
import UpdateProduct from "./UpdateProduct";
import "./ProductsAdmin.css";
import { Badge } from "primereact/badge";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const ProductsAdmin = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  const token = useSelector(selectToken);
  const [productDialog, setProductDialog] = useState(false);
  const [sizeDialog, setSizeDialog] = useState(false);
  const [imageDialog, setImageDialog] = useState(false);
  const [descDialog, setDescDialog] = useState(false);
  const [desc, setDesc] = useState("");
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [editProductDialog, setEditProductDialog] = useState(false);
  const [product, setProduct] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);

  useEffect(() => {
    dispatch(getAllProductsAsync(token));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const openNewSizeDialog = () => {
    setSizeDialog(true);
  };

  const hideSizeDialog = () => {
    setSizeDialog(false);
  };

  const openNewProductDialog = () => {
    setProductDialog(true);
  };

  const hideProductDialog = () => {
    setProductDialog(false);
  };

  const openImageDialog = () => {
    setImageDialog(true);
  };

  const hideImageDialog = () => {
    setImageDialog(false);
  };

  const openDescDialog = (rowData) => {
    setDescDialog(true);
    setDesc(rowData.description);
  };

  const hideDescDialog = () => {
    setDescDialog(false);
    setDesc("");
  };

  const editProduct = (data) => {
    setProduct(data);
    setEditProductDialog(true);
  };

  const hideEditProductDialog = (data) => {
    setProduct([]);
    setEditProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    dispatch(deleteProductAsync({ id: product._id, token: token }));
    setProduct([]);
    setDeleteProductDialog(false);
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={URL + rowData.image.image}
        alt={rowData.name}
        className="product-image"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return `$${rowData.price}`;
  };

  const sizeBody = (rowData) => {
    return (
      <Badge value={rowData.size} severity="success" className="mr-2"></Badge>
    );
  };

  const descBody = (rowData) => {
    return (
      <Button
        label="Desc"
        className="p-button-rounded p-button-info"
        onClick={() => openDescDialog(rowData)}
      />
    );
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

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          style={{ marginRight: "10px" }}
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Manage Products</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const deleteProductDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </>
  );

  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          style={{ marginRight: "10px" }}
          label="New Product"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNewProductDialog}
        />
        <Button
          style={{ marginRight: "10px" }}
          label="New Product Image"
          icon="pi pi-image"
          className="p-button-info mr-2"
          onClick={openImageDialog}
        />
        <Button
          label="New Product Size"
          icon="pi pi-plus"
          className="p-button-help mr-2"
          onClick={openNewSizeDialog}
        />
      </>
    );
  };

  return (
    <div className="datatable-crud-demo">
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
        <DataTable
          ref={dt}
          value={allProducts}
          dataKey="_id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column field="_id" header="ID" sortable></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column header="Description" body={descBody}></Column>
          <Column field="size" header="Size" body={sizeBody} sortable></Column>
          <Column header="Date" body={dateFormatedBody}></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column header="Price" body={priceBodyTemplate} sortable></Column>
          <Column field="count_in_stock" header="Amount" sortable></Column>
          <Column field="gender_category" header="Category" sortable></Column>
          <Column field="type" header="Type" sortable></Column>
          <Column field="brand" header="Brand" sortable></Column>
        </DataTable>
      </div>
      {/* product dialog */}
      <Dialog
        visible={productDialog}
        style={{ minWidth: "80%", minHeight: "100%" }}
        header="Product Details"
        modal
        onHide={hideProductDialog}
      >
        <NewProduct />
      </Dialog>
      {/* product edit dialog */}
      <Dialog
        visible={editProductDialog}
        style={{ minWidth: "80%", minHeight: "100%" }}
        header="Update Product"
        modal
        onHide={hideEditProductDialog}
      >
        <UpdateProduct product={product} />
      </Dialog>
      {/* size dialog */}
      <Dialog
        visible={sizeDialog}
        style={{ minWidth: "80%" }}
        header="Product Details"
        modal
        onHide={hideSizeDialog}
      >
        <ProductsSize />
      </Dialog>
      {/* image dialog */}
      <Dialog
        visible={imageDialog}
        style={{ minWidth: "80%" }}
        header="Product Image"
        modal
        onHide={hideImageDialog}
      >
        <ProductImage />
      </Dialog>
      {/* delete product dialog */}
      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
      {/* description dialog */}
      <Dialog
        visible={descDialog}
        style={{ width: "450px" }}
        header="Description"
        modal
        onHide={hideDescDialog}
      >
        <div className="confirmation-content">
          <p>{desc}</p>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductsAdmin;
