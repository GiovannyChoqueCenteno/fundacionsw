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
            return <button onClick={()=>handleClick('/signup')} type={'button'}>{'Unirse'}</button>
        }
        if (path==='/signup') {
            return <button onClick={()=>handleClick('/signin')} type={'button'}>{'Iniciar sesión'}</button>
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