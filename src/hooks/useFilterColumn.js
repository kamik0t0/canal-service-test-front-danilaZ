import { useState } from "react";

export function useFilterColumn(initialColumn = "name") {
    const [column, setColumn] = useState(initialColumn);
    const filterColumn = (event) => setColumn(event.target.value);

    return [column, filterColumn];
}
