import React from 'react';
import Logo from '../../Logo/Logo';
import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Drawertoggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle';
const toolbar = (props) => (
    <header className='Toolbar'>
        <Drawertoggle  clicked={props.DrawerToggledClicked}/>
        <Logo height="80%" />
        <nav className="DesktopOnly">
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);
export default toolbar;