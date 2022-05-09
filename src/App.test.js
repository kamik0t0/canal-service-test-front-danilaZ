import { render, screen } from "@testing-library/react";
import React from "react";
import axios from "axios";
import App from "./App.js";
import { fakeData } from "./utils/fakeResponseData.js";
import { renderWithStore } from "./utils/renderWithStore.js";

jest.mock("axios");

describe("Test async response", () => {
    let response;
    // перед каждым запуском функции вызывается этот метод, в данном случае можно использовать также beforeAll(() => {})
    beforeEach(() => {
        // присваиваем ожидаемый ответ сервера переменной response
        response = {
            data: fakeData,
        };
    });
    test("Test: axios.get() called once; table renders; modal renders", async () => {
        axios.get.mockReturnValue(response);
        render(renderWithStore(<App />));
        // модальное окно
        await screen.findByTestId("info");
        // таблица
        expect(await screen.findByTestId("table"));
        // запрос данных выполняется один раз
        expect(axios.get).toBeCalledTimes(1);
    });
});
