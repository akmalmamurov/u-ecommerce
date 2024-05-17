import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    token: Cookies.get("token") || null,
    name: Cookies.get("name") || null,
  },
  reducers: {
    setUser: (state, action) => {
      const { token, name } = action.payload;
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("name", name, { expires: 7 });
      state.token = token;
      state.name = name;
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
  const name = Cookies.get("name");
  if (token) {
    dispatch(setUser({ token, name }));
  }
};

export default authSlice.reducer;
