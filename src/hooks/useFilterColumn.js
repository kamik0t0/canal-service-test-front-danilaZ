import { useCallback, useState } from "react";

export function useFilterColumn(initialColumn = "name") {
    const [searchName, setSearchName] = useState(initialColumn);
    const filterColumn = (event) => setSearchName(event.target.value);

    return [searchName, filterColumn];
}
