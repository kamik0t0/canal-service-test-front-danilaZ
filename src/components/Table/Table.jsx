import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    getCountries,
    getPage,
    getCountriesOnPage,
} from "../../redux/selectors.js";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import MySelect from "../../UI/input/MySelect/MySelect.jsx";
import Footer from "../footer/Footer.jsx";
import classes from "./styles/table.module.css";
import { makePages } from "../../utils/makePages.js";
import { setCountriesAction } from "../../redux/reducer.js";
import useSort from "../../hooks/useSort.js";
import {
    pageQttyOptions,
    conditionOptions,
    searchOptions,
} from "../../utils/options.js";
import { useFilter } from "../../hooks/useFilter.js";
import { setCountriesOnPageAction } from "../../redux/countries-on-page-reducer.js";
import { useFilterColumn } from "../../hooks/useFilterColumn.js";
import { useFilterCondition } from "../../hooks/useFilterCondition.js";
import Header from "./Header.jsx";
import Rows from "./Rows.jsx";

export default function Table() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pageParam } = useParams();

    const items = useSelector(getCountries);
    const page = useSelector(getPage);
    const countriesOnPage = useSelector(getCountriesOnPage);

    // Если пользователь введет в строку поиска номер страницы
    const actualPage = pageParam === page ? page : pageParam;
    const initialRows =
        items[actualPage - 1] !== undefined
            ? [...items[actualPage - 1]]
            : [...items[0]];

    const [limit, setLimit] = useState(10);
    const [searchCondition, filterCondition] = useFilterCondition();
    const [searchName, filterColumn] = useFilterColumn();

    const filter = useFilter(initialRows, searchName, searchCondition);
    const sort = useSort(countriesOnPage);

    useEffect(() => {
        dispatch(setCountriesOnPageAction(initialRows));
    }, [page, items, pageParam]);

    /**
     * @function процедура, обрабатывает изменение количества отображаемых строк
     * @name setPagesFooter
     * @param {object} event
     */

    function setPagesFooter(event) {
        const newLimit = +event.target.value;
        setLimit(newLimit);
        dispatch(setCountriesAction(makePages(items, newLimit)));
        navigate(`${1}`);
    }

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
                                    {/* Выбор колонки фильтрации */}
                                    <MySelect
                                        data-testid="search-column"
                                        defaultValue={["выбрать колонку"][0]}
                                        func={filterColumn}
                                        options={searchOptions}
                                    />
                                </div>
                                <div
                                    className={classes.table_header_filter_name}
                                >
                                    {/* Выбор условия поиска */}
                                    <MySelect
                                        data-testid="search-condition"
                                        defaultValue={["условие"][0]}
                                        func={filterCondition}
                                        options={conditionOptions}
                                    />
                                </div>
                                <MyInput
                                    data-testid="text-input"
                                    id="filter-input"
                                    placeholder="начинайте вводить..."
                                    type="text"
                                    filter={filter}
                                />
                            </div>
                            <div className={classes.table_header_filter_name}>
                                {/* Выбор страниц */}
                                <MySelect
                                    data-testid="pages-qtty"
                                    defaultValue={["строк"][0]}
                                    func={setPagesFooter}
                                    options={pageQttyOptions}
                                />
                            </div>
                        </div>
                        <div
                            data-testid="table"
                            className={classes.table_list_frame}
                        >
                            <Header sort={sort}></Header>
                            <Rows countries={countriesOnPage}></Rows>
                        </div>
                    </div>
                    <Footer limit={limit} />
                </>
            }
        </>
    );
}
