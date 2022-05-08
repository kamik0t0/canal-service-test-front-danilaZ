/* Reducer для хранения массива динамически генерируемых номеров страниц в компоненте Footer */

/**
 * @type {object} - состояние по работе со страницами
 */

const STATE = {
    pages: [],
};

/**
 * @type {String} паттерн для redux
 */

const PAGES = "PAGES";

/**
 * @function reducer для работы с redux; хранит массив страниц
 * @name setPagesReducer
 * @param {object} state - состояние
 * @param {object} action - объект-action
 * @returns {{pages: array}}
 */

export function setPagesReducer(state = STATE, action) {
    switch (action.type) {
        case PAGES:
            return { pages: [...action.payload] };

        default:
            return state;
    }
}

/**
 * @function action creator принимает параметром массив страниц и возвращает объект с полями type и payload
 * @name setPagesAction
 * @param {array} payload - массив страниц
 * @returns {{type: string, payload: array}}
 */

export const setPagesAction = (payload) => ({ type: PAGES, payload });
