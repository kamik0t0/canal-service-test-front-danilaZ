import { screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import axios from "axios";
import App from "../App.js";
import { fakeData } from "../utils/fakeResponseData.js";
import { renderWithStore } from "../utils/renderWithStore.js";

jest.mock("axios");

describe("Test async response", () => {
    let response;
    beforeAll(() => {
        response = {
            data: fakeData,
        };
    });
    test("Test: axios.get() called once; table renders; modal renders", async () => {
        axios.get.mockReturnValue(response);
        renderWithStore(<App />);
        await screen.findByTestId("info");
        expect(await screen.findByTestId("table"));
        expect(axios.get).toBeCalledTimes(1);
    });
    test("Test: all inputs are in the document", async () => {
        renderWithStore(<App />);
        expect(await screen.findByTestId("text-input")).toBeInTheDocument();
        expect(
            await screen.findByTestId("search-condition")
        ).toBeInTheDocument();
        expect(await screen.findByTestId("pages-qtty")).toBeInTheDocument();
        expect(await screen.findByTestId("search-column")).toBeInTheDocument();
    });
    test("Test: table data in document", async () => {
        renderWithStore(<App />);
        expect(await screen.findByText(/Сингапур/i)).toBeInTheDocument();
    });
    test("Test: filter input user event", async () => {
        renderWithStore(<App />);
        const input = await screen.findByTestId("text-input");

        act(() => {
            userEvent.type(input, "Ма");
        });
        // setTimeout в связи с использовнием throttling в приложении
        setTimeout(() => {
            expect(screen.queryByText(/Барбадос/i)).toBeNull();
            expect(
                screen.queryByText(/Мальта/i, /Мальдивы/i, /Маврикий/i)
            ).toBeInTheDocument();
        }, 0);
    });
    test("Test: select input page shown qtty", async () => {
        renderWithStore(<App />);
        const strings = await screen.findByTestId("pages-qtty");
        act(() => {
            fireEvent.change(strings, {
                target: { value: 20 },
            });
        });
        expect(screen.queryByText(/Коморы/i)).toBeNull();
        expect(screen.queryByText(/Науру/i, /Барбадос/i)).toBeInTheDocument();
    });
});
