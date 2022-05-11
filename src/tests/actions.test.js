import { setCountriesAction } from "../redux/reducer.js";
import { setPagesAction } from "../redux/pages-reducer.js";
import { fakeData } from "../utils/fakeResponseData.js";

const mockPages = [1, 2, 3, 4];

describe("Actions Test", () => {
    test("setCountries test", () => {
        const countries = setCountriesAction(fakeData);
        expect(countries).toEqual({ type: "COUNTRIES", payload: fakeData });
    });
    test("setPages test", () => {
        const pages = setPagesAction(mockPages);
        expect(pages).toEqual({ type: "PAGES", payload: mockPages });
    });
});
