import { useState } from "react";

export function useFilterCondition(initialColumn = "contains") {
    const [condition, setCondition] = useState(initialColumn);
    const filterCondition = (event) => setCondition(event.target.value);

    return [condition, filterCondition];
}
