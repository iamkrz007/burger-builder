import React from 'react';
import burgerlogo from '../../assets/images/burger-logo.png';
import './Logo.css'
const logo = (props) => (
    <div className='Logo' style={{height:props.height}}>
        <img src={burgerlogo} alt ="MyBurger" />
    </div>
);

export default logo;