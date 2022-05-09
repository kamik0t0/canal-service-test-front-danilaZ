import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store.js";

export function renderWithStore(component) {
    return (
        <Provider store={store}>
            <React.StrictMode>{component}</React.StrictMode>
        </Provider>
    );
}
