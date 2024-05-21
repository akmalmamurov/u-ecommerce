import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { TOKEN } from "../../constants";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: Cookies.get(TOKEN) ? true : false,
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
      Cookies.remove(TOKEN);
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
