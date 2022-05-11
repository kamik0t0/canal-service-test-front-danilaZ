import React from "react";
import classes from "./styles/footer.module.css";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getPages } from "../../redux/selectors.js";

export default function Footer({ filter, limit }) {
    /**
     * @type {array} массив динамически сгенерированных страниц
     */
    const pages = useSelector(getPages);
    console.log(pages);

    return (
        <>
            <div className={classes.footer}>
                {pages.map((page, index) => {
                    return (
                        <div
                            data-testid={index + 1}
                            key={uuid()}
                            // по клику из колбека filter в HOC компонент Table получаем текущую страницу
                            onClick={() => filter(index + 1, limit)}
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
    filter: PropTypes.func.isRequired,
    limit: PropTypes.number.isRequired,
};
