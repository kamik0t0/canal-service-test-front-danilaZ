import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store.js";

/**
 * @function обертка над компонентом с использованием библиотеки redux в целях реализации тестирования и сокращения кода
 * @name renderWithStore
 */

export function renderWithStore(component) {
    return (
        <Provider store={store}>
            <React.StrictMode>{component}</React.StrictMode>
        </Provider>
    );
}
