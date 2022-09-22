import React from 'react';
import Header from "../elements/Header.jsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../utils/constants.js";

function AuthLayout(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const path=location.pathname;

    async function authActionHandler(newPath) {
        navigate(newPath);
    }

    function authAction() {
        if (path==='/signin'){
            return <button onClick={()=>authActionHandler(routes.signUp)} type={'button'}>{'Unirse'}</button>
        }
        if (path==='/signup') {
            return <button onClick={()=>authActionHandler(routes.signIn)} type={'button'}>{'Iniciar sesión'}</button>
        }
    }

    return (
        <>
            <Header menuItems={[]} authAction={authAction()}/>
            <main className={'flex grow'}>
                <Outlet/>
            </main>
        </>
    );
}

export default AuthLayout;