import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./styles/footer.module.css";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getPages } from "../../redux/selectors.js";
import { setPageAction } from "../../redux/page-reducer.js";
import { getCountries } from "../../redux/selectors.js";
import { setPagesListAction } from "../../redux/pages-list-reducer.js";
import { makePagesList } from "../../utils/makePagesList.js";
import PropTypes from "prop-types";

export default function Footer({ limit }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /**
     * @type {array} массив динамически сгенерированных страниц
     */
    const pages = useSelector(getPages);
    const items = useSelector(getCountries);

    useEffect(() => {
        dispatch(setPagesListAction(makePagesList(items, limit)));
    }, [items]);

    return (
        <>
            <div className={classes.footer}>
                {pages.map((page, index) => {
                    return (
                        <div
                            data-testid={index + 1}
                            key={uuid()}
                            onClick={() => {
                                const page = index + 1;
                                dispatch(setPageAction(page));
                                navigate(`${page}`);
                            }}
                            className={classes.page}
                        >
                            {page}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

Footer.propTypes = {
    limit: PropTypes.number.isRequired,
};
