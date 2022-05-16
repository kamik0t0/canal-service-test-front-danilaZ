import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App.js";
import Table from "../components/Table/Table.jsx";

const Router = () => {
    return (
        <>
            <Routes>
                <Route
                    path={`canal-service-test-front-danilaZ/*`}
                    element={<App />}
                    exact
                >
                    <Route path=":pageParam" element={<Table />} exact></Route>
                </Route>
            </Routes>
        </>
    );
};

export default Router;
