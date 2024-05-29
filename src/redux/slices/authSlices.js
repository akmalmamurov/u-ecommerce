import { createSlice } from "@reduxjs/toolkit";
import { TOKEN } from "../../constants";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: localStorage.getItem(TOKEN) ? true : false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    phoneNumber: localStorage.getItem("phoneNumber") || "",
  },
  reducers: {
    setAuth: (state) => {
      state.isAuth = true;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    setPhoneNumber: (state, { payload }) => {
      state.phoneNumber = payload;
      localStorage.setItem("phoneNumber", payload);
    },
    logoutUser: (state) => {
      localStorage.removeItem(TOKEN); 
      localStorage.removeItem("user");
      localStorage.removeItem("phoneNumber");
      state.user = null;
      state.phoneNumber = "";
      state.isAuth = false;
    },
  },
});

export const { setUser, setAuth, setPhoneNumber, logoutUser } =
  authSlice.actions;

export default authSlice.reducer;
