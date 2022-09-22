import React from 'react';
import Header from "../elements/Header.jsx";
import {Outlet} from "react-router-dom";
import {menuOptionsToAdmin} from "../../utils/menu.js";

function AdminLayout(props) {

    function authAction() {
        return (
            <button>{'Cerrar sesión'}</button>
        )
    }

    return (
        <>
            <Header menuItems={menuOptionsToAdmin} authAction={authAction()}>

            </Header>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default AdminLayout;