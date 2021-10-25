import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary';
const sideDrawer = (props) => {
    let attachedClasses =["SideDrawer", "Close"];
    if(props.open){
        attachedClasses =["SideDrawer", "Open"];
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems clicked={props.closed} isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;