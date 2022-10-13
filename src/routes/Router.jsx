import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/client/Home/index.jsx";
import Categoria from '../pages/admin/Categoria/index.jsx';
import AppLayout from "../components/templates/AppLayout.jsx";
import AuthLayout from "../components/templates/AuthLayout.jsx";
import AdminLayout from "../components/templates/AdminLayout.jsx";
import SignUp from "../pages/auth/SignUp.jsx";
import SignIn from "../pages/auth/SignIn.jsx";

import RequestFoundations from '../pages/admin/foundations/RequestFoundations';

import Department from '../pages/admin/departments/index.jsx';


import { ProtectedRoute } from './PrivateRoute.jsx';

import DetailsRequest from '../pages/admin/foundations/DetailsRequest.jsx';

import Bills from '../pages/client/bills';
import AdminHome from '../pages/admin/index.jsx';
import { ClientRoute } from './ClientRoute.jsx';

import  FoundationsByCategory from '../pages/client/foundations/FoundationsByCategory'
import FoundationsByDepartament from '../pages/client/foundations/FountdationsByDepartament.jsx';
import { PublicRoute } from './PublicRoute.jsx';
import Foundation from '../pages/client/myfoundation/Foundation.jsx';
import DetailsFoundation from '../pages/client/foundations/DetailsFoundation';
import FoundationBill from '../pages/client/foundations/FoundationBill.jsx';

function Router(props) {

    return (
        <BrowserRouter>
            <Routes>

                <Route element={<AppLayout />}>
                    <Route index path='/' element={<Home />} />
                </Route>
                <Route path={'admin/*'} element={
                    <ProtectedRoute
                        children={<AdminLayout />}
                    >
                    </ProtectedRoute>}>
                    <Route path='' element={<AdminHome />} />
                    <Route path='applications' element={<Home />} />
                    <Route path='categories' element={<Categoria />} />
                    <Route path='solicitudes' element={<RequestFoundations />} />
                    <Route path='departments' element={<Department />} />
                    <Route path='solicitud/:id' element={<DetailsRequest />} />
                </Route>
                <Route path={'client/*'} element={
                <ClientRoute
                    children={<AppLayout />}
                />
                }>
                    <Route path='fundacion' element={<Foundation />} />
                    <Route path='bills/:id' element={<Bills />} />
                </Route>
                <Route path='*' element={
                    <PublicRoute 
                        children={<AppLayout />}
                    />
                }>
                <Route  path='' element={<Home />} />
                <Route path='categories' element={<FoundationsByCategory  />}  />
                <Route path='departments'  element={<FoundationsByDepartament  />}  />
                <Route path='foundation/:id' element={<DetailsFoundation />} />
                <Route path='foundation/bill/:foundationId' element={<FoundationBill />} />
                
                </Route>

                <Route element={<AuthLayout />}>
                    <Route  path='/signin' element={<SignIn />} />
                    <Route  path='/signup' element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter >
    );
}

export default Router;