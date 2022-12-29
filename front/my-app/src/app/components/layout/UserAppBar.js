import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLogged,
  logOutAsync,
  selectToken,
  selectExpirationTime,
  doLogout,
} from "../../Slices/userSlice";
import {
  changeStatus,
  selectCart,
  selectCartShownStatus,
} from "../../Slices/cartSlice";
import MyCart from "../product/MyCart";
//Mui import
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const UserAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const exp = useSelector(selectExpirationTime);
  const token = useSelector(selectToken);
  const cart = useSelector(selectCart);
  const logged = useSelector(selectLogged);
  const status = useSelector(selectCartShownStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pages = ["Men", "Women", "Kids"];
  //changes value depending on whether the user is logged in or not
  const settings = logged ? ["Orders", "Logout"] : ["Sign In", "Sign Up"];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navUserMenu = (setting) => {
    //navigates depending on the button that was pressed
    if (setting === "Sign In") navigate("/login");
    else if (setting === "Sign Up") navigate("/register");
    else if (setting === "Orders") navigate("/userorders");
    else if (setting === "Logout") {
      dispatch(logOutAsync(token));
      navigate("/");
    }
    handleCloseUserMenu();
  };

  const navMenu = (page) => {
    navigate(`products/${page}`);
    handleCloseNavMenu();
  };

  useEffect(() => {}, [logged]);

  useEffect(() => {}, [cart]);

  useEffect(() => {
    if (token && exp) {
      //if the token has expired automatically logout
      if (new Date().getTime() > +exp * 1000) {
        dispatch(doLogout());
      }
    }
  });

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#000000" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Typography
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              <Link style={{ color: "white" }} to="/">
                <img
                   src={require("../../assets/Asset 3.png")}
                   alt="fantazee"
                  width={100}
                  height={70}
                ></img>
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => navMenu(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
              }}
            >
              <Link style={{ color: "white" }} to="/">
                <img
                  src={require("../../assets/Asset 3.png")}
                  alt="fantazee"
                  width={100}
                  height={70}
                ></img>
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => navMenu(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Typography variant="h6">{page}</Typography>
                </Button>
              ))}
            </Box>
            {/* cart */}
            <Stack direction="row" spacing={0.3}>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Cart">
                  <Button onClick={() => dispatch(changeStatus(!status))}>
                    <Badge color="secondary" badgeContent={cart.length}>
                      <ShoppingCartIcon
                        sx={{ color: "white", fontSize: 50 }}
                      />
                    </Badge>
                  </Button>
                </Tooltip>
              </Box>

              <MyCart />
              {/* avatar */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    {logged ? (
                      <Avatar alt="User avatar" src="" />
                    ) : (
                      <Avatar
                        sx={{ width: 50, height: 50 }}
                        alt="User avatar"
                        src="https://picsum.photos/200"
                      />
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => navUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default UserAppBar;
