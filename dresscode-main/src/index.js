import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext";
window.setTitle = () => {};
window.setCategory = () => {};
const app = (
  <UserContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContextProvider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
