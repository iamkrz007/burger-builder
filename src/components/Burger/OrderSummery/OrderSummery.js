import React, { useEffect } from 'react';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';
const OrderSummary = (props) => {
    useEffect(()=>{
    },[props.ordernow]);
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize', color: 'pink' }}>{igKey}</span> : {props.ingredients[igKey]}
           </li>

        })
    return (
        <Aux>
            <h3 style={{ color: 'pink' }}>Your Order</h3>
            <p style={{ color: 'pink' }}>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : $ {props.totalPrice.toFixed(2)}</strong></p>
            <p style={{ color: 'pink' }}>continue to checkout</p>
            <Button clicked={props.purchaseCancelled} btntype='Danger'>Cancel</Button>
            <Button clicked={props.purchaseContinued} btntype='Success'>Continue</Button>
        </Aux>
    )
};

export default OrderSummary;
