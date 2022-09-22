import React from 'react';
import {NavLink} from "react-router-dom";

function MenuLink({path,title}) {
    return (
        <li>
            <NavLink
                className={({ isActive }) =>
                    isActive ? 'active-link' : 'inactive-link'
                }
                to={path}>
                {title}
            </NavLink>
        </li>
    );
}

export default MenuLink;
/*

style={({ isActive }) =>
isActive ? 'active-link' : 'inactive-link'
}*/
