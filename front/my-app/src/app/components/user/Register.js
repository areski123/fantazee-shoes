import React from "react";
import { useState, forwardRef } from "react";
import "./User.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAsync } from "../../Slices/userSlice";

import { Form } from "react-bootstrap";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [warningCPassword, setWarningCPassword] = useState(false);
  const [WarningOpen, setWarningOpen] = useState(false);
  const [SuccessOpen, setSuccessOpen] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const handleClick = (message) => {
    if (message === "warning") setWarningOpen(true);
    else if (message === "success") setSuccessOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setWarningOpen(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setWarningCPassword(false);

    if (password !== confirmPassword) {
      setWarningCPassword(true);
      handleClick("warning");
    } else {
      handleClick("success");
      dispatch(registerAsync({ username, email, password }));
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <>
      <div className="container-user">
        <div className="card-user">
          <div className="user-form">
            <div className="user-left-side">
              <img src={require("../../assets/reg_log.jpg")} alt="" />
            </div>
            <div className="user-right-side">
              <div className="user-heading">
                <h3>Sign up for fantazee Shoes.</h3>
              </div>
              <Form onSubmit={submitForm}>
                <div className="user-input-text">
                  <Form.Control
                    required
                    type="text"
                    placeholder="User Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                  />
                </div>
                <div className="user-input-text">
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                  />
                </div>
                <div className="user-input-text">
                  <Form.Control
                    required
                    type={passwordShown ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                  />
                  <label>Password</label>
                </div>
                <div className="user-input-text">
                  <Form.Control
                    required
                    type={passwordShown ? "text" : "password"}
                    className={`${warningCPassword ? "user-warning" : ""}`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="confimPassword"
                  />
                  <label>Confrim password</label>
                </div>

                <div className="show_pass">
                  <div className="show-user">
                    <span
                      onClick={togglePassword}
                      className={`${passwordShown ? "user-green" : ""}`}
                    ></span>
                    <p>{passwordShown ? "Hide password" : "Show password"}</p>
                  </div>
                </div>
                <div className="user-button">
                  <button type="submit">Register</button>
                </div>
              </Form>
              <div className="register">
                <p>
                  Already have an account?<Link to="/login"> Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={WarningOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Passwords don't match!
        </Alert>
      </Snackbar>
      <Snackbar
        open={SuccessOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          User {username} signed up
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
