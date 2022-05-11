/**
 * @function динамически формирует массив страниц для пагинации
 * @name makePagesList
 * @param {Array} pages - массив страниц
 * @param {Number} limit - количество выводимых строк на страницу
 * @returns {Array}
 */

export function makePagesList(pages, limit) {
    console.log(limit);
    let countPages = Math.ceil(pages.length / limit);
    console.log(countPages);
    let pagesArr = [];

    for (let i = 1; i <= countPages; i++) {
        pagesArr.push(i);
    }
    console.log(pagesArr);
    return pagesArr;
}
