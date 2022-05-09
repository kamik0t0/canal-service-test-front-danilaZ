// компонент показывающий список существующих накладных
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import classes from "./styles/table.module.css";
import TableItem from "../table-item/TableItem.jsx";
import MySelect from "../../UI/input/MySelect/MySelect.jsx";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import {
    sortByDate,
    sortByName,
    sortByQuantity,
    sortByDistance,
} from "../../utils/sorts.js";
import { throttle } from "../../utils/throttle.js";
import PropTypes from "prop-types";
import Footer from "../footer/Footer.jsx";

export default function Table({ limit, setLimit }) {
    // Получение всего массива страниц в глобальное состояние
    const items = useSelector((state) => state.setCountriesReducer.countries);
    // Локальное состояния списка отображаемых элементов таблицы для пагинации
    const [sliced, setSliced] = useState([...items.slice(0, limit)]);
    // Локальное состояние по работе с элементами таблицы
    const [tableItems, setTableItems] = useState([...sliced]);
    // Локальное состояние для порядка фильтрации
    const [sortOrder, setSortOrder] = useState(false);
    // Локальное состояние для работы со столбцом фильтрации
    const [searchName, setSearchName] = useState("name");
    // Локальное состояние для работы с условием фильтрации
    const [searchCondition, setSearchCondition] = useState("contains");

    useEffect(() => {
        setSliced([...items.slice(0, limit)]);
        setTableItems([...items.slice(0, limit)]);
    }, [limit]);

    // переменные для throttling
    let isCooldown = useRef(false),
        savedArgs = useRef(),
        savedThis = useRef();

    /**
     * @function изменяет порядок сортировки по названию
     * @name sortByNameState
     */

    const sortByNameState = () => {
        const sorted = sortByName(sliced, sortOrder);
        setSortOrder(!sortOrder);
        setTableItems([...sorted]);
    };

    /**
     * @function изменяет порядок сортировки по количеству
     * @name sortByQuantityState
     */

    const sortByQuantityState = () => {
        const sorted = sortByQuantity(sliced, sortOrder);
        setSortOrder(!sortOrder);
        setTableItems([...sorted]);
    };
    /**
     * @function изменяет порядок сортировки по расстоянию
     * @name sortByDistanceState
     */
    const sortByDistanceState = () => {
        const sorted = sortByDistance(sliced, sortOrder);
        setSortOrder(!sortOrder);
        setTableItems([...sorted]);
    };

    /**
     * @type {Number}
     */

    const prevRender = useRef(1);

    /**
     * @function фильтрация для пагинации
     * @name pageFilter
     * @param {number} page - номер страницы
     * @param {number} limit - количество элементов на странице (по умолчанию 10)
     */

    const pageFilter = (page, limit = 10) => {
        // если передана та же страница перерисовка не происходит
        if (prevRender.current === +page) return;
        prevRender.current = page;
        // вычисляем последнюю страницу...
        const lastPage = page * limit;
        // ... и фильтруем массив
        const filtered = items.filter(
            (item, index) => index > lastPage - limit && index <= lastPage
        );
        // при переключении страниц оба локальных состояния должны измениться
        setSliced([...filtered]);
        setTableItems([...filtered]);
    };

    /**
     * @function - осуществляет непосредственно фильтрацию элементов и изменяет состояние
     * @name filtered
     */
    function filtered(event) {
        console.log(sliced);
        /**
         * @type {(Number|String)}
         */

        let text = event.target.value;
        console.log(text);
        // в случае если передана пустая строка возвращаем исходный массив данных
        if (text === "") {
            setTableItems([...sliced]);
            return;
        }

        /**
         * @type {Array} - отфильтрованный массив
         */

        let filtered;
        // Логика фильтрации для типа "string".
        console.log(searchName);
        if (searchName === "name") {
            switch (searchCondition) {
                case "equal":
                    filtered = sliced.filter(
                        (item) =>
                            item[searchName]
                                .toString()
                                .toLowerCase()
                                .localeCompare(text) === 0
                    );
                    break;
                case "more":
                    filtered = sliced.filter(
                        (item) =>
                            item[searchName].toString().localeCompare(text) ===
                            1
                    );
                    break;
                case "less":
                    filtered = sliced.filter(
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
                    filtered = sliced.filter(
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
                    filtered = sliced.filter(
                        (item) => +item[searchName] === +text
                    );
                    break;
                case "more":
                    filtered = sliced.filter(
                        (item) => +item[searchName] > +text
                    );
                    break;
                case "less":
                    filtered = sliced.filter(
                        (item) => +item[searchName] < +text
                    );
                    break;

                default:
                    filtered = sliced.filter((item) =>
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
                    <div className={classes.content}>
                        <div className={classes.table_header}>
                            <div className={classes.table_header_filter}>
                                <div
                                    className={classes.table_header_filter_name}
                                >
                                    {/* Поиск по: */}
                                    <MySelect
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
                                    id="filter-input"
                                    placeholder="начинайте вводить..."
                                    type="text"
                                    filter={filter}
                                />
                            </div>
                            <div className={classes.table_header_filter_name}>
                                {/* Поиск по: */}
                                <MySelect
                                    defaultValue={["строк"][0]}
                                    func={(event) => {
                                        setLimit(+event.target.value);
                                    }}
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
                    <Footer filter={pageFilter} limit={limit} />
                </>
            }
        </>
    );
}

Table.propTypes = {
    limit: PropTypes.number.isRequired,
    setLimit: PropTypes.func.isRequired,
};

/* P.s. функции фильтрации, сортировки и прочее реализованы прямо в компоненте, поскольку они отвечают именно за рендеринг и импортировать их с кучей передаваемых параметров для их "чистоты" на мой взгляд нет смысла */
