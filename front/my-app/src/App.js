import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAdminMode } from "./app/Slices/adminSlice";
import { selectIsAdmin } from "./app/Slices/userSlice";
import UserAppBar from "./app/components/layout/UserAppBar";
import Footer from "./app/components/layout/Footer";
import Scroll from "./app/components/layout/Scroll";
import AdminAppBar from "./app/components/admin/AdminAppBar";

function App() {
  const isAdmin = useSelector(selectIsAdmin);
  const adminMode = useSelector(selectIsAdminMode);

  useEffect(() => {}, [isAdmin, adminMode]);

  if (isAdmin && adminMode) {
    return (
      <>
        <AdminAppBar />
        <Outlet />
        <Scroll />
        <Footer />
      </>
    );
  } else {
  }
  return (
    <>
      <UserAppBar />
      <Outlet />
      <Scroll />
      <Footer />
    </>
  );
}

export default App;
