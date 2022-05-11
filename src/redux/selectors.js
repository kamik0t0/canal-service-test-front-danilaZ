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
export const getPages = (state) => state?.setPagesReducer?.pages || [];
