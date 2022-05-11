import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store.js";
import { render } from "@testing-library/react";
/**
 * @function обертка над компонентом с использованием библиотеки redux в целях реализации тестирования и сокращения кода
 * @name renderWithStore
 * @param {function} React компонент
 */

export function renderWithStore(component) {
    return render(
        <Provider store={store}>
            <React.StrictMode>{component}</React.StrictMode>
        </Provider>
    );
}
