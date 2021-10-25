import React from 'react';
import './NavigationItems.css';
import NavigationItem from '../NavigationItem/NavigationItem'
const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem click={props.clicked} link='/' exact>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem click={props.clicked} link='/orders'>Orders</NavigationItem> : null}
        {!props.isAuthenticated ?
            <NavigationItem click={props.clicked} link='/auth'>Authenticate</NavigationItem> :
            <NavigationItem click={props.clicked} link='/logout'>Logout</NavigationItem>}
    </ul>
);


export default navigationItems;