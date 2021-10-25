import React, { useEffect } from 'react';
import './Modal.css';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Backdrop from '../Backdrop/backdrop';
const Modal = (props) => {
    useEffect(() => {
    }, [props.show])
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className='Modal'
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>
    )
};

export default React.memo(Modal);