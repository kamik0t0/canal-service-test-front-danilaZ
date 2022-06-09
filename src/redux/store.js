import { legacy_createStore as createStore, combineReducers } from "redux";

import { setCountriesReducer } from "./reducer.js";
import { setPagesListReducer } from "./pages-list-reducer.js";
import { setPageReducer } from "./page-reducer.js";
import { setCountriesOnPageReducer } from "./countries-on-page-reducer.js";

const rootReducer = combineReducers({
    setCountriesReducer: setCountriesReducer,
    setPagesListReducer: setPagesListReducer,
    setPageReducer: setPageReducer,
    setCountriesOnPageReducer: setCountriesOnPageReducer,
});

export const store = createStore(rootReducer);
