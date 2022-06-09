import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Info from "./components/info/Info.jsx";
import { setPagesListAction } from "./redux/pages-list-reducer.js";
import { setCountriesAction } from "./redux/reducer.js";
import { setCountriesOnPageAction } from "./redux/countries-on-page-reducer.js";
import classes from "./styles/app.module.css";
import Loader from "./UI/Loader/Loader.jsx";
import MyModal from "./UI/modal/modal.jsx";
import { makePagesList } from "./utils/makePagesList.js";
import { makePages } from "./utils/makePages.js";
import Table from "./components/Table/Table.jsx";

export default function App() {
    const dispatch = useDispatch();
    // Состояние для анимации загрузки
    const [loader, setLoader] = useState(true);
    // Состояние для управление модальным окном
    const [modal, setModal] = useState(true);
    /**
     * @function выполняет запрос на сервер, получает данные и изменяет глобальное состояние
     * @name getPages
     */
    async function getPages() {
        try {
            const Page = await // await axios.get("http://localhost:5700")
            (
                await axios.get("http://localhost:5700")
            ).data[0];
            // стартовый массив пагинации
            dispatch(setPagesListAction(makePagesList(Page, 10)));
            // заполняем store
            dispatch(setCountriesAction(makePages(Page, 10)));
            dispatch(setCountriesOnPageAction(Page.splice(0, 10)));
            // убираем анимацию загрузки
            setLoader(false);
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    }

    useEffect(() => {
        getPages();
    }, []);

    return (
        <>
            <div data-testid="app" id="app" className={classes.app}>
                {loader ? (
                    <Loader />
                ) : (
                    <>
                        <MyModal active={modal} setModal={setModal}>
                            <Info />
                        </MyModal>
                        <Table />
                    </>
                )}
            </div>
        </>
    );
}

// await axios.get("http://localhost:5700")
// "https://canal-service-back.herokuapp.com"
