import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./css/index.css";
import "tw-elements";
import router from "./nav/Navigation";
import { TransferContextProvider } from "./context/TransferContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TransferContextProvider>
      <RouterProvider router={router} />
    </TransferContextProvider>
  </React.StrictMode>
);
