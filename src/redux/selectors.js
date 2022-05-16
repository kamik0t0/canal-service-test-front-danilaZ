/**
 * @function selector
 * @name getCountries
 * @param {Object} state
 * @returns {Array}
 */
export const getCountries = (state) =>
    state?.setCountriesReducer?.countries || [];

/**
 * @function selector
 * @name getPages
 * @param {Object} state
 * @returns {Array}
 */
export const getPages = (state) => state?.setPagesListReducer?.pages || [];
/**
 * @function selector
 * @name getPage
 * @param {Object} state
 * @returns {Number}
 */
export const getPage = (state) => state?.setPageReducer?.page || 1;
