import React from "react";
import TableItem from "../table-item/TableItem.jsx";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

const Rows = ({ countries }) => {
    return (
        <>
            {countries.length > 0 &&
                countries.map((tableItem) => {
                    return <TableItem key={uuid()} tableItem={tableItem} />;
                })}
        </>
    );
};

export default Rows;

Rows.propTypes = {
    countries: PropTypes.array.isRequired,
};
