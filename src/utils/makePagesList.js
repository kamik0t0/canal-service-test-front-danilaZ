/**
 * @function динамически формирует массив страниц для пагинации
 * @name makePagesList
 * @param {Array} pages - массив страниц
 * @param {Number} limit - количество выводимых строк на страницу
 * @returns {Array} - количество страниц
 */

export function makePagesList(pages, limit) {
    let pagesArr = [];
    if (Array.isArray(pages[0])) {
        pages.forEach((elem, index) => pagesArr.push(index + 1));
    } else {
        let countPages = Math.ceil(pages.length / limit);

        for (let i = 1; i <= countPages; i++) {
            pagesArr.push(i);
        }
    }

    return pagesArr;
}
