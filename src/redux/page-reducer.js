/* Reducer для хранения массива динамически генерируемых номеров страниц в компоненте Footer */

/**
 * @type {object} - состояние по работе со страницами
 */

const STATE = {
    page: 1,
};

/**
 * @type {String} паттерн для redux
 */

const PAGE = "PAGE";

/**
 * @function reducer для работы с redux; хранит номер страницы
 * @name setPagesReducer
 * @param {object} state состояние
 * @param {object} action объект-action
 * @returns {{pages: array}}
 */

export function setPageReducer(state = STATE, action) {
    switch (action.type) {
        case PAGE:
            return { page: +action.payload };
        default:
            return state;
    }
}

/**
 * @function action creator принимает параметром номер страницы и возвращает объект с полями type и payload
 * @name setPageAction
 * @param {array} payload номер страницы
 * @returns {{type: string, payload: number}} объект
 */

export const setPageAction = (payload) => ({ type: PAGE, payload });
