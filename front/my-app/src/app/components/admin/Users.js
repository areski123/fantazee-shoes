import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectToken,
  getUsersAsync,
  selectUsers,
} from "../../Slices/userSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const token = useSelector(selectToken);

  const header = (
    <div className="table-header">
      <h5 style={{ textAlign: "center" }} className="mx-0 my-1">
        Users
      </h5>
    </div>
  );

  const dateFormatedBody = (rowData) => {
    let tempDate = new Date(rowData.date_joined);
    let year = tempDate.getFullYear();
    let month = tempDate.getMonth() + 1;
    let dt = tempDate.getDate();
    return `${year}-${month < 10 ? "0" + month : month}-${
      dt < 10 ? "0" + dt : dt
    }`;
  };

  useEffect(() => {
    console.log(users);
    dispatch(getUsersAsync(token));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <DataTable
        value={users}
        dataKey="_id"
        header={header}
        responsiveLayout="scroll"
      >
        <Column field="id" header="ID" sortable></Column>
        <Column header="Date Joined" body={dateFormatedBody}></Column>
        <Column field="username" header="Username"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="is_superuser" header="Super User" sortable></Column>
      </DataTable>
    </div>
  );
};

export default Users;
