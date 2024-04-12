import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
const { ToastContainer } = createStandaloneToast();
import App from "./App.jsx";
import "swiper/css";
import "./index.css";
import theme from "./theme.js";
import { store } from "./redux/store/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider
        theme={theme}
        toastOptions={{ defaultOptions: { position: "top" } }}
      >
        <App />
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
