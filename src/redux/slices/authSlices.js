import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: null,
    isAuth: false,
    token: Cookies.get("token") || null,
  },
  reducers: {
    setUser: (state, action) => {
      Cookies.set("token", action.payload.token,{expires: 7});
      state.token = action.payload.token;
      state.isAuth = true;
    },
    logoutUser: (state) => {
      Cookies.remove("token");
      state.name = null;
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export const setUserFromCookies = () => (dispatch) => {
  const token = Cookies.get("token");
  if (token) {
    dispatch(setUser(token));
  }
};

export default authSlice.reducer;
