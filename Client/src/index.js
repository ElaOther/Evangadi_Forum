import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);


