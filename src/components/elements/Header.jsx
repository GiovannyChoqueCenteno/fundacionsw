import React from 'react';
import Menu from "./Menu.jsx";

function Header({menuItems, authAction}) {
    return (
        <header className={'bg-white h-16 flex items-center p-5'}>
            <h1 className={'flex-none text-3xl text-theme-primary font-bold'}>{'Fundaciones'}</h1>
            <div className="grow">
                <Menu items={menuItems}/>
            </div>
            <div className="flex-none">
                {authAction}
            </div>
        </header>
    );
}

export default Header;