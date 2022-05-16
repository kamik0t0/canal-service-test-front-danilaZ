// компонент показывающий список существующих накладных
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { getCountries, getPage } from "../../redux/selectors.js";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import MySelect from "../../UI/input/MySelect/MySelect.jsx";
import {
    sortByDate,
    sortByDistance,
    sortByName,
    sortByQuantity,
} from "../../utils/sorts.js";
import { throttle } from "../../utils/throttle.js";
import Footer from "../footer/Footer.jsx";
import TableItem from "../table-item/TableItem.jsx";
import classes from "./styles/table.module.css";
import { makePages } from "../../utils/makePages.js";
import { setCountriesAction } from "../../redux/reducer.js";

export default function Table() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pageParam } = useParams();
    // Получение всего массива страниц в глобальное состояние
    const items = useSelector(getCountries);
    const page = useSelector(getPage);

    /**
     * @type {number} устанавливает актуальную и валидную страницу
     */

    let actualPage = page;
    // если пользователь перед переключением количества выводимых строк был на странице с номером больше, чем последняя страница после обновления
    if (pageParam !== page && pageParam <= items.length) {
        actualPage = pageParam;
    }
    const [limit, setLimit] = useState(10);
    // Локальное состояние по работе с элементами таблицы
    const [tableItems, setTableItems] = useState(
        items[actualPage - 1] !== undefined
            ? [...items[actualPage - 1]]
            : [...items[0]]
    );
    // Локальное состояние для порядка фильтрации
    const [sortOrder, setSortOrder] = useState(false);
    // Локальное состояние для работы со столбцом фильтрации
    const [searchName, setSearchName] = useState("name");
    // Локальное состояние для работы с условием фильтрации
    const [searchCondition, setSearchCondition] = useState("contains");

    useEffect(() => {
        setTableItems(
            items[actualPage - 1] !== undefined
                ? [...items[actualPage - 1]]
                : [...items[0]]
        );
    }, [page, items, pageParam]);

    /**
     * @function процедура, обрабатывает изменение количества отображаемых строк и перенаправляет на первую страницу
     * @name setPagesFooter
     * @param {object} event
     */

    function setPagesFooter(event) {
        const newLimit = +event.target.value;
        setLimit(newLimit);
        dispatch(setCountriesAction(makePages(items, newLimit)));
        navigate(`${1}`);
    }

    // переменные для throttling
    let isCooldown = useRef(false),
        savedArgs = useRef(),
        savedThis = useRef();

    /**
     * @function изменяет порядок сортировки по названию
     * @name sortByNameState
     */

    const sortByNameState = () => {
        const sorted = sortByName(tableItems, sortOrder);
        setSortOrder(!sortOrder);
        setTableItems([...sorted]);
    };

    /**
     * @function изменяет порядок сортировки по количеству
     * @name sortByQuantityState
     */

    const sortByQuantityState = () => {
        const sorted = sortByQuantity(tableItems, sortOrder);
        setSortOrder(!sortOrder);
        setTableItems([...sorted]);
    };
    /**
     * @function изменяет порядок сортировки по расстоянию
     * @name sortByDistanceState
     */
    const sortByDistanceState = () => {
        const sorted = sortByDistance(tableItems, sortOrder);
        setSortOrder(!sortOrder);
        setTableItems([...sorted]);
    };

    /**
     * @function - осуществляет непосредственно фильтрацию элементов и изменяет состояние
     * @name filtered
     */
    function filtered(event) {
        /**
         * @type {(Number|String)}
         */

        let text = event.target.value;
        // в случае если передана пустая строка возвращаем исходный массив данных
        if (text === "") {
            setTableItems([...items[page - 1]]);
            return;
        }

        /**
         * @type {Array} - отфильтрованный массив
         */

        let filtered;
        // Логика фильтрации для типа "string".
        if (searchName === "name") {
            switch (searchCondition) {
                case "equal":
                    filtered = items[page - 1].filter(
                        (item) =>
                            item[searchName]
                                .toString()
                                .toLowerCase()
                                .localeCompare(text) === 0
                    );
                    break;
                case "more":
                    filtered = items[page - 1].filter(
                        (item) =>
                            item[searchName].toString().localeCompare(text) ===
                            1
                    );
                    break;
                case "less":
                    filtered = items[page - 1].filter(
                        (item) =>
                            item[searchName].toString().localeCompare(text) ===
                            -1
                    );
                    break;
                default:
                    /**
                     * @type {String}
                     */
                    let regexp = new RegExp(`${text.toLowerCase()}`, "g");
                    filtered = items[page - 1].filter(
                        (item) =>
                            item[searchName]
                                .toString()
                                .toLowerCase()
                                .search(regexp) !== -1
                    );
            }
        } else {
            // Логика фильтрации для типа "number".
            switch (searchCondition) {
                case "equal":
                    filtered = items[page - 1].filter(
                        (item) => +item[searchName] === +text
                    );
                    break;
                case "more":
                    filtered = items[page - 1].filter(
                        (item) => +item[searchName] > +text
                    );
                    break;
                case "less":
                    filtered = items[page - 1].filter(
                        (item) => +item[searchName] < +text
                    );
                    break;

                default:
                    filtered = items[page - 1].filter((item) =>
                        item[searchName].toString().includes(text)
                    );
            }
        }
        setTableItems([...filtered]);
    }

    /**
     * @function обработчик фильтрации замыкающая в себе декоратор с необходимыми аргументами и саму фильтрующую функцию
     * @name filter
     */
    const filter = throttle(filtered, isCooldown, savedArgs, savedThis);

    return (
        <>
            {
                <>
                    <div data-testid="div" className={classes.content}>
                        <div className={classes.table_header}>
                            <div className={classes.table_header_filter}>
                                <div
                                    className={classes.table_header_filter_name}
                                >
                                    {/* Поиск по: */}
                                    <MySelect
                                        data-testid="search-column"
                                        defaultValue={["выбрать колонку"][0]}
                                        func={(event) => {
                                            setSearchName(event.target.value);
                                        }}
                                        options={[
                                            "выбрать колонку",
                                            {
                                                value: "name",
                                                name: "Названию",
                                            },
                                            {
                                                value: "quantity",
                                                name: "Количеству",
                                            },
                                            {
                                                value: "distance",
                                                name: "Расстоянию",
                                            },
                                        ]}
                                    />
                                </div>
                                <div
                                    className={classes.table_header_filter_name}
                                >
                                    {/* Условие: */}
                                    <MySelect
                                        data-testid="search-condition"
                                        defaultValue={["условие"][0]}
                                        func={(event) => {
                                            setSearchCondition(
                                                event.target.value
                                            );
                                        }}
                                        options={[
                                            "условие",
                                            {
                                                value: "equal",
                                                name: "=",
                                            },
                                            {
                                                value: "contains",
                                                name: "содержит",
                                            },
                                            {
                                                value: "more",
                                                name: ">",
                                            },
                                            {
                                                value: "less",
                                                name: "<",
                                            },
                                        ]}
                                    />
                                </div>
                                <div
                                    className={classes.table_header_filter_name}
                                ></div>
                                <MyInput
                                    data-testid="text-input"
                                    id="filter-input"
                                    placeholder="начинайте вводить..."
                                    type="text"
                                    filter={filter}
                                />
                            </div>
                            <div className={classes.table_header_filter_name}>
                                {/* Поиск по: */}
                                <MySelect
                                    data-testid="pages-qtty"
                                    defaultValue={["строк"][0]}
                                    func={setPagesFooter}
                                    options={[
                                        "строк",
                                        {
                                            value: 10,
                                            name: 10,
                                        },
                                        {
                                            value: 15,
                                            name: 15,
                                        },
                                        {
                                            value: 20,
                                            name: 20,
                                        },
                                        {
                                            value: 30,
                                            name: 30,
                                        },
                                        {
                                            value: 40,
                                            name: 40,
                                        },
                                    ]}
                                />
                            </div>
                            {/* наименование раздела */}
                            <div className={classes.table_header_name}></div>
                        </div>
                        {/* шапка */}
                        <div
                            data-testid="table"
                            className={classes.table_list_frame}
                        >
                            <div className={classes.table_list_header}>
                                {/* дата */}
                                <div
                                    className={classes.table_list_header_date}
                                    // onClick={sortByDateState}
                                >
                                    Дата
                                </div>
                                {/* название */}
                                <div
                                    className={classes.table_list_header_name}
                                    onClick={sortByNameState}
                                >
                                    Название
                                </div>
                                {/* количеств */}
                                <div
                                    className={classes.table_list_header_qtty}
                                    onClick={sortByQuantityState}
                                >
                                    Количество
                                </div>
                                {/* Площадь - переименовал ячейку для соответствия контексту - надеюсь это не преступление ;) */}
                                <div
                                    className={classes.table_list_header_dist}
                                    onClick={sortByDistanceState}
                                >
                                    Площадь кв.км
                                </div>
                            </div>
                            {/* элементы таблицы */}
                            {tableItems.length > 0 &&
                                tableItems.map((tableItem) => {
                                    return (
                                        <TableItem
                                            key={uuid()}
                                            tableItem={tableItem}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    <Footer limit={limit} />
                </>
            }
        </>
    );
}
