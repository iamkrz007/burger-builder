import React from 'react';
import './NavigationItem.css'
import { NavLink } from 'react-router-dom';
const navigationitem = (props) => (
    <li className="NavigationItem">
        <NavLink
            to={props.link}
            onClick={props.click}
            exact={props.exact}
            activeClassName="active">{props.children}</NavLink>
    </li>

);

export default navigationitem;