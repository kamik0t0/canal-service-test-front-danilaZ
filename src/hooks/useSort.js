import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCountriesOnPageAction } from "../redux/countries-on-page-reducer.js";
import { sortByDistance, sortByName, sortByQuantity } from "../utils/sorts.js";

export default function useSort(items) {
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState(false);

    const sort = (event) => {
        const sortField = event.target.innerHTML;
        let sortedItems;
        switch (sortField) {
            case "Количество":
                sortedItems = sortByQuantity([...items], sortOrder);
                break;
            case "Площадь кв.км":
                sortedItems = sortByDistance([...items], sortOrder);
                break;

            default:
                sortedItems = sortByName([...items], sortOrder);
                break;
        }

        setSortOrder(!sortOrder);
        dispatch(setCountriesOnPageAction(sortedItems));
    };

    return sort;
}
