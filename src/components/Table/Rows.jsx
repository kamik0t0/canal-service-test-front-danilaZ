import React from "react";
import TableItem from "../table-item/TableItem.jsx";
import { v4 as uuid } from "uuid";

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
