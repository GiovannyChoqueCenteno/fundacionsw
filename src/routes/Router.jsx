import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/client/Home/index.jsx";

function Router(props) {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
        </BrowserRouter>
    );
}

export default Router;