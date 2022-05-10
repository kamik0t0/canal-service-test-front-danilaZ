import classes from "./styles/app.module.css";
import Table from "./components/Table/Table.jsx";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./UI/Loader/Loader.jsx";
import { useDispatch } from "react-redux";
import { setCountriesAction } from "./redux/reducer.js";
import { setPagesAction } from "./redux/pages-reducer";
import { makePagesList } from "./utils/makePagesList.js";
import { fakeData } from "./utils/fakeResponseData.js";
import MyModal from "./UI/modal/modal.jsx";
import Info from "./components/info/Info.jsx";

export default function App() {
    const dispatch = useDispatch();
    // Состояние для анимации загрузки
    const [loader, setLoader] = useState(true);
    // Состояние для лимита отображаемых строк
    const [limit, setLimit] = useState(10);
    // Состояние для управление модальным окном
    const [modal, setModal] = useState(true);
    /**
     * @function выполняет запрос на сервер, получает данные и изменяет глобальное состояние
     * @name getPages
     */
    async function getPages() {
        try {
            const Page = await (
                await axios.get("http://localhost:5700")
            ).data[0];
            dispatch(setPagesAction(makePagesList(Page, limit)));
            dispatch(setCountriesAction(Page));
            setLoader(false);
        } catch (error) {
            console.log(error);
            // в случае ошибки подключения к серверу или к БД будут подставлены фейковые данные из приложения, чтобы можно было проверить основной функционал
            dispatch(setPagesAction(makePagesList(fakeData, limit)));
            dispatch(setCountriesAction(fakeData));
            setLoader(false);
        }
    }

    useEffect(() => {
        return () => getPages();
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
                        <Table limit={limit} setLimit={setLimit} />
                    </>
                )}
            </div>
        </>
    );
}
