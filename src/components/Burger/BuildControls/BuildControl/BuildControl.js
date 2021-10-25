import React from 'react';
import './BuildControl.css';
const buildControl = (props) => (
    <div className='BuildControl'>
        <div className='label'>{props.label}</div>
        <button className='less' onClick={props.removed} disabled={props.disabled}>less</button>
        <button className='more' onClick={props.added}>More</button>
    </div>
);

export default buildControl;