import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doLogin, register, logout, getUsers } from "../API/userAPI";
import jwt_decode from "jwt-decode";

const initialState = {
  users: [],
  userName: "",
  logged: false,
  token: "",
  isAdmin: false,
  expirationTime: 0,
};

export const loginAsync = createAsyncThunk(
  "user/doLogin",
  async (loginData) => {
    const response = await doLogin(loginData);
    return response.data;
  }
);

export const registerAsync = createAsyncThunk(
  "user/register",
  async (registerData) => {
    const response = await register(registerData);
    return response.data;
  }
);

export const logOutAsync = createAsyncThunk("user/logout", async (token) => {
  const response = await logout(token);
  return response.data;
});

export const getUsersAsync = createAsyncThunk(
  "user/getUsers",
  async (token) => {
    const response = await getUsers(token);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    doLogout: (state) => {
      state.token = "";
      state.logged = false;
      state.userName = "";
      state.isAdmin = false;
      state.expirationTime = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.logged = true;
        state.token = action.payload.access;
        //gets data from the token
        state.userName = jwt_decode(action.payload.access).username;
        state.isAdmin = jwt_decode(action.payload.access).is_admin;
        state.expirationTime = jwt_decode(action.payload.access).exp;
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.token = "";
        state.logged = false;
        state.userName = "";
        state.isAdmin = false;
        state.expirationTime = 0;
      });
  },
});

export const { doLogout } = userSlice.actions;
export const selectLogged = (state) => state.user.logged;
export const selectToken = (state) => state.user.token;
export const selectUserName = (state) => state.user.userName;
export const selectIsAdmin = (state) => state.user.isAdmin;
export const selectExpirationTime = (state) => state.user.expirationTime;
export const selectUsers = (state) => state.user.users;

export default userSlice.reducer;
