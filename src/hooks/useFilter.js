import { useDispatch } from "react-redux";
import { setCountriesOnPageAction } from "../redux/countries-on-page-reducer.js";
import { throttle } from "../utils/throttle.js";
import { useRef } from "react";

/**
 * @function хук-фильт
 * @name useFilter
 * @param {array} initialRows массив строк в таблице
 * @param {string} searchName столбец фильтрации
 * @param {string} searchCondition условие фильтрации
 * @return {function} фильтрующая функция
 */

export function useFilter(initialRows, searchName, searchCondition) {
    const dispatch = useDispatch();

    let isCooldown = useRef(false),
        savedArgs = useRef(),
        savedThis = useRef();

    function filtered(event) {
        let text = event.target.value;

        let filtered;
        // Логика фильтрации для типа "string".
        if (searchName === "name") {
            switch (searchCondition) {
                case "equal":
                    filtered = initialRows.filter(
                        (item) =>
                            item[searchName]
                                .toString()
                                .toLowerCase()
                                .localeCompare(text) === 0
                    );
                    break;
                case "more":
                    filtered = initialRows.filter(
                        (item) =>
                            item[searchName].toString().localeCompare(text) ===
                            1
                    );
                    break;
                case "less":
                    filtered = initialRows.filter(
                        (item) =>
                            item[searchName].toString().localeCompare(text) ===
                            -1
                    );
                    break;
                default:
                    let regexp = new RegExp(`${text.toLowerCase()}`, "g");
                    filtered = initialRows.filter(
                        (item) =>
                            item[searchName]
                                .toString()
                                .toLowerCase()
                                .search(regexp) !== -1
                    );
            }
        } else {
            // Логика фильтрации для типа "number".
            switch (searchCondition) {
                case "equal":
                    filtered = initialRows.filter(
                        (item) => +item[searchName] === +text
                    );
                    break;
                case "more":
                    filtered = initialRows.filter(
                        (item) => +item[searchName] > +text
                    );
                    break;
                case "less":
                    filtered = initialRows.filter(
                        (item) => +item[searchName] < +text
                    );
                    break;

                default:
                    filtered = initialRows.filter((item) =>
                        item[searchName].toString().includes(text)
                    );
            }
        }
        dispatch(setCountriesOnPageAction(filtered));
    }

    const filter = throttle(filtered, isCooldown, savedArgs, savedThis);
    return filter;
}
