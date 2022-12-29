import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMode } from "../../Slices/adminSlice";
import "./AdminButtons.css";
const AdminButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMode = (data) => {
    dispatch(changeMode(data.mode));
    navigate(data.path);
  };

  return (
    <div className="admin-buttons-container">
      <button
        className="admin-button"
        onClick={() => handleMode({ mode: true, path: "/admin" })}
      >
        <span />
        <span />
        <span />
        <span />
        Admin Mode
      </button>
      <button
        className="admin-button"
        onClick={() => handleMode({ mode: false, path: "/" })}
      >
        <span />
        <span />
        <span />
        <span />
        User Mode
      </button>
    </div>
  );
};

export default AdminButtons;
