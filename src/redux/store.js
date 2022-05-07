import { legacy_createStore as createStore, combineReducers } from "redux";

import { setCountriesReducer } from "./reducer.js";
import { setPagesReducer } from "./pages-reducer.js";

const rootReducer = combineReducers({
    setCountriesReducer: setCountriesReducer,
    setPagesReducer: setPagesReducer,
});

export const store = createStore(rootReducer);
