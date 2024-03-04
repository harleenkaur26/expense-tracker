import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// Components
import App from "./App";
import { store } from "store/store";
// Style
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
