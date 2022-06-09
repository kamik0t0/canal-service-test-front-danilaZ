import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCountriesAction } from "../redux/reducer.js";
import { makePages } from "../utils/makePages.js";

/**
 * @function хук, обрабатывает изменение количества отображаемых строк
 * @name useLimit
 * @param {number} initialLimit
 * @param {array} items
 * @return {array}
 */

export const useLimit = (initialLimit = 10, items) => {
    const [rowLimit, setLimit] = useState(initialLimit);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setRowLimit = (event) => {
        const newLimit = +event.target.value;
        setLimit(newLimit);
        dispatch(setCountriesAction(makePages(items, newLimit)));
        navigate(`${1}`);
    };
    return [rowLimit, setRowLimit];
};
