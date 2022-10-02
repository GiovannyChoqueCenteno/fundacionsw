import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/client/Home/index.jsx";
import Categoria from '../pages/admin/Categoria/index.jsx';
import AppLayout from "../components/templates/AppLayout.jsx";
import AuthLayout from "../components/templates/AuthLayout.jsx";
import AdminLayout from "../components/templates/AdminLayout.jsx";
import DetallesFundacion from '../pages/client/foundations/DetailsFoundation';
import SignUp from "../pages/auth/SignUp.jsx";
import SignIn from "../pages/auth/SignIn.jsx";

import RequestFoundations from '../pages/admin/foundations/RequestFoundations';
import RequestFoundation from '../pages/client/foundations/RequestFoundation'

import Department from '../pages/admin/departments/index.jsx';


import { ProtectedRoute } from './PrivateRoute.jsx';


function Router(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route index path='/' element={<Home/>}/>
                </Route>
                <Route path={'admin'} element={
                    <ProtectedRoute>
                        <Routes>
                            <Route path='/' element={<AdminLayout />} />
                        </Routes>
                    </ProtectedRoute>}>
                    <Route path='applications' element={<Home />} />
                    <Route path='categories' element={<Categoria />} />
                    <Route path='departments' element={<Department />} />
                </Route>
                <Route element={<AppLayout />}>
                    <Route index path='/' element={<Home />} />
                    <Route path='/fundacion/:id' element={<DetallesFundacion />} />
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path='/fundacion/solicitud' element={<RequestFoundation />} />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route index path='/signin' element={<SignIn />} />
                    <Route index path='/signup' element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;