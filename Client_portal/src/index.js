import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import clientreducer from "./redux/clientSlice";
import AuthSlice from "./redux/AuthSlice";
const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: {
    details: clientreducer,
    Auth: AuthSlice,
  },
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
