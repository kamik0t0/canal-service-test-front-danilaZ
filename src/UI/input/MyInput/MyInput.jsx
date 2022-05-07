import React from "react";
import classes from "./styles/my-input.module.css";
import PropTypes from "prop-types";

const MyInput = ({ type, filter, ...props }) => {
    return (
        <>
            <div className={classes.fields__item}>
                <input
                    className={classes.fields__item_input}
                    type={`${type}`}
                    onChange={filter}
                    {...props}
                />
            </div>
        </>
    );
};

export default MyInput;

MyInput.propTypes = {
    type: PropTypes.string,
    filter: PropTypes.func,
};
