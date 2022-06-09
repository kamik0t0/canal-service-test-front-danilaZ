import React from "react";
import classes from "./styles/table.module.css";

const Header = ({ sort }) => {
    return (
        <div className={classes.table_list_header}>
            <div className={classes.table_list_header_date}>Дата</div>
            <div className={classes.table_list_header_name} onClick={sort}>
                Название
            </div>
            <div className={classes.table_list_header_qtty} onClick={sort}>
                Количество
            </div>
            <div className={classes.table_list_header_dist} onClick={sort}>
                Площадь кв.км
            </div>
        </div>
    );
};

export default Header;
