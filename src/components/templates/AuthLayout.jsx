import React from 'react';
import Header from "../elements/Header.jsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

function AuthLayout(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const path=location.pathname;

    function handleClick(newPath){
        navigate(newPath);
    }

    function authAction() {
        if (path==='/signin'){
            return <button onClick={()=>handleClick('/signout')} type={'button'}>{'Unirse'}</button>
        }
        if (path==='/signout') {
            return <button onClick={()=>handleClick('/signin')} type={'button'}>{'Iniciar sesión'}</button>
        }
    }

    return (
        <>
            <Header menuItems={[]} authAction={authAction()}/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default AuthLayout;