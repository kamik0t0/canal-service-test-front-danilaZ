import React from "react";
import classes from "./styles/table-item.module.css";
import PropTypes from "prop-types";

export default function TableItem({ tableItem }) {
    /**
     * @type {String} строка с датой
     */

    const parseDate = new Date(
        Date.parse(tableItem.createdAt)
    ).toLocaleDateString();

    /**
     * @type {String} строка со временем
     */

    const parseTime = new Date(
        Date.parse(tableItem.createdAt)
    ).toLocaleTimeString();

    return (
        <div className={classes.item_list}>
            {/* накладная */}
            <div className={classes.item}>
                {/* дата */}
                <div className={classes.item_date}>
                    {parseDate + " " + parseTime}
                </div>
                {/* название */}
                <div className={classes.item_name}>{tableItem.name}</div>
                {/* количество */}
                <div className={classes.item_qtty}>{tableItem.quantity}</div>
                {/* площадь */}
                <div className={classes.item_dist}>{tableItem.distance}</div>
            </div>
        </div>
    );
}

TableItem.propTypes = {
    tableItem: PropTypes.object.isRequired,
};
