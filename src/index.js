import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <React.StrictMode>
                <Router />
            </React.StrictMode>
        </Provider>
    </BrowserRouter>
);
