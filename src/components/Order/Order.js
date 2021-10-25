import React from 'react';
import './Order.css'
const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName],
            })
    }
    let ingredientOutput = ingredients.map((ig, index) => {
        return <span
            key={index}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>{ig.name} ({ig.amount})</span>;
    });
    return (
        <div className="Order">
            <p>{ingredientOutput}</p>
            <p>price:<strong> $ {props.price.toFixed(2)}</strong></p>
            <p>{props.date}</p>
        </div>
    )
}

export default order;