import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updatedObject, checkValidity } from '../../../shared/utility';
const ContactData = (props) => {
    const [orderForm, setOrderform] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipcode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zipcode'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true,

            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        deliveryMode: {
            elementType: 'select',
            elementConfig: {
                options: [{ value: 'fastest', displayValue: 'fastest' },
                { value: 'cheapest', displayValue: 'cheapest' }]
            },
            value: 'fastest',
            validation: {},
            valid: true

        }
    })
    const [formIsValid, setFormIsValid] = useState(false);
    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value
        }
        const order = {
            burgerIngredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId,
            orderTime: Date(),
        }
        props.onOrderBurger(order, props.token);
    }

    
    const inputChangedHander = (event, inputIdentifier) => {

        const updatedFormElement = updatedObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updatedObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        setOrderform(updatedOrderForm);
        setFormIsValid(formIsValid);
    }
    const formElementArray = [];
    for (let key in orderForm) {
        formElementArray.push({
            id: key,
            config: orderForm[key],
        })
    }
    let form = (
        <form onSubmit={orderHandler} >
            {formElementArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHander(event, formElement.id)} />
            ))
            }
            <Button btntype="Success" clicked={orderHandler} disabled={!formIsValid}>ORDER</Button>
        </form>);
    if (props.loading) {
        form = <Spinner />
    }
    return (
        <div className="ContactData">
            <h4> Enter your Contact Data</h4>
            {form}
        </div>
    )

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));