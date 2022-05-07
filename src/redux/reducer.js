/* Reducer для основного массива данных для таблицы */

const STATE = {
    countries: [],
};

const COUNTRIES = "COUNTRIES";

export function setCountriesReducer(state = STATE, action) {
    switch (action.type) {
        case COUNTRIES:
            return { countries: [...action.payload] };

        default:
            return state;
    }
}

export const setCountriesAction = (payload) => ({ type: COUNTRIES, payload });
