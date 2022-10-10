import React from 'react';
import MenuLink from "./MenuLink.jsx";

function Menu({items}) {
    return <nav className={'flex justify-center'}>
        <ul className={'flex gap-5'}>
            {
                items.map((item, index) => {
                    console.log(item)
                    return <MenuLink key={index} path={item.path} title={item.title}/>
                })
            }
        </ul>
    </nav>;
}

export default Menu;