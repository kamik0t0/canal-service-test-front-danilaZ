/**
 * @function сортировка по дате
 * @name sortByDate
 * @param {array} tableItems - массив элементов
 * @param {boolean} sortOrder - порядок сортировки
 * @returns {array}
 */

export function sortByDate(tableItems, sortOrder) {
    return sortOrder
        ? tableItems.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        : tableItems.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

/**
 * @function сортировка по наименованию
 * @name sortByName
 * @param {array} tableItems - массив элементов
 * @param {boolean} sortOrder - порядок сортировки
 * @returns {array}
 */

export function sortByName(tableItems, sortOrder) {
    return sortOrder
        ? tableItems.sort((a, b) => a.name.localeCompare(b.name))
        : tableItems.sort((a, b) => b.name.localeCompare(a.name));
}

/**
 * @function сортировка по количеству
 * @name sortByQuantity
 * @param {array} tableItems - массив элементов
 * @param {boolean} sortOrder - порядок сортировки
 * @returns {array}
 */

export function sortByQuantity(tableItems, sortOrder) {
    return sortOrder
        ? tableItems.sort((a, b) => a.quantity - b.quantity)
        : tableItems.sort((a, b) => b.quantity - a.quantity);
}

/**
 * @function сортировка по расстоянию
 * @name sortByDistance
 * @param {array} tableItems - массив элементов
 * @param {boolean} sortOrder - порядок сортировки
 * @returns {array}
 */

export function sortByDistance(tableItems, sortOrder) {
    return sortOrder
        ? tableItems.sort((a, b) => a.distance - b.distance)
        : tableItems.sort((a, b) => b.distance - a.distance);
}
