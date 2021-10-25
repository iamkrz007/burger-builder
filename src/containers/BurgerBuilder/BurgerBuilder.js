import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = (props) => {
    const [purchasing, setpurchasing] = useState(false);
    useEffect(() => {
        props.onInitIngredients();
    }, [])

    const updatePurcaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }
    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setpurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }
    const purchaseCancelHandler = () => {
        setpurchasing(false)
    }
    const purchasecontinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }
    const disabledinfo = {
        ...props.ings
    };
    for (let key in disabledinfo) {
        disabledinfo[key] = disabledinfo[key] <= 0
    }
    let orderSummery = null
    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings} />
                <BuildControls ingredientAdded={props.onIngredinetAdded}
                    ingredientRemoved={props.onIngredinetRemoved}
                    ordered={purchaseHandler}
                    disabledinfo={disabledinfo}
                    price={props.price}
                    purchasable={updatePurcaseState(props.ings)}
                    isAuth={props.isAuthenticated} />
            </Aux>
        );
        orderSummery = <OrderSummary ingredients={props.ings}
            purchaseContinued={purchasecontinueHandler}
            purchaseCancelled={purchaseCancelHandler}
            totalPrice={props.price}
            ordernow={purchasing} />
    }
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummery}
            </Modal>
            {burger}
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredinetAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredinetRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
