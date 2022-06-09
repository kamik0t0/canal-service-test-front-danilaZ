import { useCallback, useState } from "react";

export function useFilterCondition(initialColumn = "contains") {
    const [searchCondition, setSearchCondition] = useState(initialColumn);
    const filterCondition = (event) => setSearchCondition(event.target.value);

    return [searchCondition, filterCondition];
}
