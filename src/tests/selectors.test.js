import { getCountries, getPages } from "../redux/selectors.js";
import { fakeData } from "../utils/fakeResponseData.js";

const mockedPagesArr = [1, 2, 3, 4];

// тестирование selector
describe("Selectors Test", () => {
    test("Selector Test: getCountries []", () => {
        expect(getCountries({})).toEqual([]);
    });
    test("Selector Test: getPages []", () => {
        expect(getPages({})).toEqual([]);
    });
    test("Selector Test: getCountries [...data]", () => {
        const countries = getCountries({
            setCountriesReducer: { countries: fakeData },
        });
        expect(countries).toBe(fakeData);
    });
    test("Selector Test: getPages [...data]", () => {
        const pages = getPages({
            setPagesReducer: { pages: mockedPagesArr },
        });
        expect(pages).toBe(mockedPagesArr);
    });
});
