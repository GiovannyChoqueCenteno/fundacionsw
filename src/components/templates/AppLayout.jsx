import React from 'react';
import Header from "../elements/Header.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import {menuOptionsToClient} from "../../utils/menu.js";
import {routes} from "../../utils/constants.js";
import {closeSession} from "../../services/auth.js";
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth.js';
import {getFoundationByUser} from '../../services/foundation'
 
function AppLayout(props) {
    const {user} = useAuth()
    const navigate = useNavigate();

    async function authActionHandler() {
        await closeSession();
        sessionStorage.removeItem("auth");
        navigate(routes.signIn);
    }

    function authAction() {
        
           if (user)             
            return <button onClick={authActionHandler}>{'Cerrar sesión'}</button>
            else
            return <button onClick={()=>navigate('/signin')}>{'Iniciar sesión'}</button>
    }
   
    return (
        <>
            <Header menuItems={menuOptionsToClient} authAction={authAction()}>

            </Header>
            <main className={'flex grow'}>
                <Outlet/>
            </main>
        </>
    );
}

export default AppLayout;