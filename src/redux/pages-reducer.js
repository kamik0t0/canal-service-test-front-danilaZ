/* Reducer для хранения массива динамически генерируемых номеров страниц в компоненте Footer */

const STATE = {
    pages: [],
};

const PAGES = "PAGES";

export function setPagesReducer(state = STATE, action) {
    switch (action.type) {
        case PAGES:
            return { pages: [...action.payload] };

        default:
            return state;
    }
}

export const setPagesAction = (payload) => ({ type: PAGES, payload });
