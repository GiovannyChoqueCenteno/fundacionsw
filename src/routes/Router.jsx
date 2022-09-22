import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/client/Home/index.jsx";
import AppLayout from "../components/templates/AppLayout.jsx";
import AuthLayout from "../components/templates/AuthLayout.jsx";
import AdminLayout from "../components/templates/AdminLayout.jsx";
import SignUp from "../pages/auth/SignUp.jsx";

function Router(props) {
    return (
        <BrowserRouter>
            <Routes>

                <Route path={'admin'} element={<AdminLayout/>}>
                    <Route path='applications' element={<Home/>}/>
                </Route>

                <Route element={<AppLayout/>}>
                    <Route index path='/' element={<Home/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Route>
                <Route element={<AuthLayout/>}> {/* if you implement a component please change the components in the routes*/}
                    <Route index path='/signin' element={<Home/>}/>
                    <Route index path='/signup' element={<SignUp/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;