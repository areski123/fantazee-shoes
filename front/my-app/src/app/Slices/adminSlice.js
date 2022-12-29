import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdminMode: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.isAdminMode = action.payload;
    },
  },
});

export const { changeMode } = adminSlice.actions;
export const selectIsAdminMode = (state) => state.admin.isAdminMode;

export default adminSlice.reducer;
