import React from "react";
import classes from "./styles/modal.module.css";
import PropTypes from "prop-types";

export default function Modal({ active, setModal, children }) {
    return (
        <>
            <div
                className={
                    active
                        ? classes.modal + " " + classes.active
                        : classes.modal
                }
                onClick={() => setModal(false)}
            >
                <div
                    className={
                        active
                            ? classes.modal__content + " " + classes.active
                            : classes.modal__content
                    }
                    onClick={(event) => event.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </>
    );
}

Modal.propTypes = {
    active: PropTypes.bool.isRequired,
    setModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};
