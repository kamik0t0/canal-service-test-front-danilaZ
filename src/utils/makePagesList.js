/**
 * @function динамически формирует массив страниц для пагинации
 * @name makePagesList
 * @param {Array} pages - страницы
 * @param {Number} limit - количество выводимых строк на страницу
 * @returns {Array}
 */

export function makePagesList(pages, limit) {
    let countPages = Math.ceil(pages.length / limit);
    let pagesArr = [];

    for (let i = 1; i <= countPages; i++) {
        pagesArr.push(i);
    }
    return pagesArr;
}
