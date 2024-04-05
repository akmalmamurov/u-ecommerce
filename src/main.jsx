import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
const { ToastContainer } = createStandaloneToast();
import App from "./App.jsx";
import "./index.css";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider
      theme={theme}
      toastOptions={{ defaultOptions: { position: "top" } }}
    >
      <App />
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>
);
