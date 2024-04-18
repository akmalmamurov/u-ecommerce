import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
const { ToastContainer } = createStandaloneToast();
import App from "./App.jsx";
import "swiper/css";
import "./index.css";
import theme from "./theme.js";
import { persistor, store } from "./redux/store/index.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <ChakraProvider
          theme={theme}
          toastOptions={{ defaultOptions: { position: "top" } }}
        >
          <App />
          <ToastContainer />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
