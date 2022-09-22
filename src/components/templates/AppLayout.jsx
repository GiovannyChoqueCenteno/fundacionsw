import React from 'react';
import Header from "../elements/Header.jsx";
import {Outlet} from "react-router-dom";
import {menuOptionsToClient} from "../../utils/menu.js";

function AppLayout(props) {

    function authAction() {
        return (
            <button>{'Cerrar sesión'}</button>
        )
    }

    return (
        <>
            <Header menuItems={menuOptionsToClient} authAction={authAction()}>

            </Header>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default AppLayout;