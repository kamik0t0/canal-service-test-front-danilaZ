import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getCountries,
    getPage,
    getCountriesOnPage,
} from "../../redux/selectors.js";
import MyInput from "../../UI/input/MyInput/MyInput.jsx";
import MySelect from "../../UI/input/MySelect/MySelect.jsx";
import Footer from "../footer/Footer.jsx";
import classes from "./styles/table.module.css";
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
import { useLimit } from "../../hooks/useLimit.js";

export default function Table() {
    const dispatch = useDispatch();
    const { pageParam } = useParams();

    const items = useSelector(getCountries);
    const page = useSelector(getPage);
    const countriesOnPage = useSelector(getCountriesOnPage);
    const [rowLimit, setRowLimit] = useLimit(10, items);
    const [searchCondition, filterCondition] = useFilterCondition();
    const [searchName, filterColumn] = useFilterColumn();

    // Если пользователь введет в строку поиска номер страницы
    const actualPageNumber = pageParam === page ? page : pageParam;
    const actualPage =
        items[actualPageNumber - 1] !== undefined
            ? [...items[actualPageNumber - 1]]
            : [...items[0]];

    const filter = useFilter(actualPage, searchName, searchCondition);
    const sort = useSort(countriesOnPage);

    useEffect(() => {
        dispatch(setCountriesOnPageAction(actualPage));
    }, [page, items, pageParam]);

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
                                    func={setRowLimit}
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
                    <Footer limit={rowLimit} />
                </>
            }
        </>
    );
}
