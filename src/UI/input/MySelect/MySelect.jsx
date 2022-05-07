import React from "react";
import classes from "./styles/my-select.module.css";
import PropTypes from "prop-types";

export default function MySelect({ options, func, ...props }) {
    return (
        <>
            <div className={classes.fields__item}>
                <select
                    onChange={func}
                    className={classes.fields__item_input}
                    {...props}
                >
                    {options.map((option, index) => {
                        {
                            if (index === 0) {
                                return (
                                    /* key={index} допустимо в данном случае, поскольку не предусмотрена динамическая перетасовка элементов массива */
                                    <option key={index} disabled>
                                        {option}
                                    </option>
                                );
                            } else {
                                return (
                                    <option key={index} value={option.value}>
                                        {option.name}
                                    </option>
                                );
                            }
                        }
                    })}
                </select>
            </div>
        </>
    );
}

MySelect.propTypes = {
    options: PropTypes.array,
    func: PropTypes.func,
    props: PropTypes.object,
};
