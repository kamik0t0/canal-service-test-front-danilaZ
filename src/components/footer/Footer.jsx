import React, { useEffect } from "react";
import classes from "./styles/footer.module.css";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getPages } from "../../redux/selectors.js";
import { getCountries } from "../../redux/selectors.js";
import { setPagesListAction } from "../../redux/pages-list-reducer.js";
import { makePagesList } from "../../utils/makePagesList.js";
import { useNavToPage } from "../../hooks/useNavToPage.js";
import PropTypes from "prop-types";

export default function Footer({ limit }) {
    const dispatch = useDispatch();

    const pages = useSelector(getPages);
    const items = useSelector(getCountries);
    const navToPage = useNavToPage();

    useEffect(() => {
        dispatch(setPagesListAction(makePagesList(items, limit)));
    }, [items]);

    return (
        <>
            <div className={classes.footer}>
                {pages.map((pageNum, index) => {
                    return (
                        <div
                            data-testid={index + 1}
                            key={uuid()}
                            onClick={navToPage}
                            className={classes.page}
                        >
                            {pageNum}
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
