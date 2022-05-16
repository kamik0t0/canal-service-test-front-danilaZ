/* Reducer для основного массива данных для таблицы */

/**
 * @type {object} - состояние по работе со строками таблицы
 */

const STATE = {
    countries: [],
};

/**
 * @type {String} паттерн для redux
 */

const COUNTRIES = "COUNTRIES";

/**
 * @function reducer для работы с redux; хранит массив строк таблицы
 * @name setCountriesReducer
 * @param {object} state состояние
 * @param {object} action объект-action
 * @returns {{countries: array}}
 */

export function setCountriesReducer(state = STATE, action) {
    switch (action.type) {
        case COUNTRIES:
            return { countries: [...action.payload] };

        default:
            return state;
    }
}

/**
 * @function action creator принимает параметром массив строк и возвращает объект с полями type и payload
 * @name setCountriesAction
 * @param {array} payload массив страниц
 * @returns {{type: string, payload: array}} объект
 */

export const setCountriesAction = (payload) => ({ type: COUNTRIES, payload });
