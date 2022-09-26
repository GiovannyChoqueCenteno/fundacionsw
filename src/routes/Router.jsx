import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/client/Home/index.jsx";
import Categoria from '../pages/admin/Categoria/index.jsx';
import AppLayout from "../components/templates/AppLayout.jsx";
import AuthLayout from "../components/templates/AuthLayout.jsx";
import AdminLayout from "../components/templates/AdminLayout.jsx";

import DetallesFundacion from '../pages/client/Fundaciones/DetallesFundacion.jsx';

import SignUp from "../pages/auth/SignUp.jsx";
import SignIn from "../pages/auth/SignIn.jsx";

function Router(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'admin'} element={<AdminLayout/>}>
                    <Route path='applications' element={<Home/>}/>
                    <Route path='categories' element={<Categoria />} />
                </Route>
                <Route element={<AppLayout/>}>
                    <Route index path='/' element={<Home/>}/>
                    <Route path='/fundacion/:id' element={<DetallesFundacion />} />
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Route>
                <Route element={<AuthLayout/>}>
                    <Route index path='/signin' element={<SignIn/>}/>
                    <Route index path='/signup' element={<SignUp/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;