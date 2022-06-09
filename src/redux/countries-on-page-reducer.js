/* Reducer основного массива данных для таблицы */

/**
 * @type {object} - состояние по работе со строками таблицы
 */

const STATE = {
    countriesOnPage: [],
};

const COUNTRIESONPAGE = "COUNTRIESONPAGE";

/**
 * @function reducer для работы с redux; хранит массив строк таблицы
 * @name setCountriesReducer
 * @param {object} state состояние
 * @param {object} action объект-action
 * @returns {{countries: array}}
 */

export function setCountriesOnPageReducer(state = STATE, action) {
    switch (action.type) {
        case COUNTRIESONPAGE:
            return { countriesOnPage: [...action.payload] };

        default:
            return state;
    }
}

/**
 * @function action creator принимает параметром массив строк на странице и возвращает объект с полями type и payload
 * @name setCountriesOnPageAction
 * @param {array} payload массив страниц
 * @returns {{type: string, payload: array}} объект
 */

export const setCountriesOnPageAction = (payload) => ({
    type: COUNTRIESONPAGE,
    payload,
});
