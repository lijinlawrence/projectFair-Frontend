import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./bootstrap.min.css";
import ContextShare from "./Context/ContextShare";
import TokenAuth from "./Context/TokenAuth";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextShare>
        <TokenAuth>
        <App />
        </TokenAuth>
      </ContextShare>
    </BrowserRouter>
  </React.StrictMode>
);
