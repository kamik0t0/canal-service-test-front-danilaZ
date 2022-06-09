import { useState } from "react";
import { sortByDistance, sortByName, sortByQuantity } from "../utils/sorts.js";

export default function useSort(items) {
    const [sortOrder, setSortOrder] = useState(false);

    const sort = (event) => {
        const sortField = event.target.innerHTML;
        switch (sortField) {
            case "Количество":
                sortByQuantity(items, sortOrder);
                break;
            case "Площадь кв.км":
                sortByDistance(items, sortOrder);
                break;

            default:
                sortByName(items, sortOrder);
                break;
        }

        setSortOrder(!sortOrder);
    };

    return sort;
}
