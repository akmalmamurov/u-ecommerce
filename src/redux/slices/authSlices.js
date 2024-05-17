import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { TOKEN } from "../../constants";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: Cookies.get(TOKEN) ? true : false,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  },
  reducers: {
    setAuth: (state) => {
      state.isAuth = true;
    },
    setUser: (state, { payload }) => {
      console.log(payload);
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    logoutUser: (state) => {
      Cookies.remove(TOKEN);
      localStorage.removeItem("user");
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, setAuth, logoutUser } = authSlice.actions;

export default authSlice.reducer;
