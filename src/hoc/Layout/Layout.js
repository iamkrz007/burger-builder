import React, { useState } from 'react';
import Aux from '../Auxilary/Auxilary';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const SideDrawerToggleHandler = () => {
        setShowSideDrawer(true)
    }
    return (
        <Aux>
            <Toolbar DrawerToggledClicked={SideDrawerToggleHandler} isAuth={props.isAuthenticated} />
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} isAuth={props.isAuthenticated} />
            <main className='content'>
                {props.children}
            </main>
        </Aux>
    )
};


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken !== null
    };
}

export default connect(mapStateToProps)(Layout);
