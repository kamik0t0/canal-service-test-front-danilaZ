/**
 * @function динамически формирует массив страниц для пагинации
 * @name makePagesList
 * @param {Array} pages массив страниц (может быть многомерным)
 * @param {Number} limit количество выводимых строк на страницу
 * @returns {Array} количество страниц
 */

export function makePages(pages, limit) {
    const arr = [];
    let counter = 0;
    let page = [];

    const flat = flatten(pages);

    for (let i = 0; i < flat.length; i++) {
        counter++;
        page.push(flat[i]);
        if (counter === limit) {
            arr.push(page);
            page = [];
            counter = 0;
        } else if (counter < limit && i === flat.length - 1) {
            arr.push(page);
        }
    }
    return arr;
}

/**
 * @function рекурсивно преобразовывает многомерный массив в одномерный
 * @name flatten
 * @param {Array} array массив
 * @returns {Array} возвращает плоский массив
 */

function flatten(array) {
    let flat = [];
    recursion(array);
    return flat;

    function recursion(array) {
        if (Array.isArray(array)) {
            array.forEach((subArr) => recursion(subArr));
        } else {
            flat.push(array);
        }
    }
}
