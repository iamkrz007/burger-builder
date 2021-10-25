import React, { useEffect, useState, useImperativeHandle } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as action from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
const Orders = (props) => {

    useEffect(() => {
        props.onFetchOrders(props.token, props.userId)
    }, [])

    let orders = <Spinner />
    if (!props.loading) {
        orders = (
            <div>
                {props.orders.map(order => {
                    return (
                        <Order key={order.id}
                            date={order.orderTime}
                            ingredients={order.burgerIngredients}
                            price={+order.price} />
                    )
                })}
            </div>
        )
    }
    return orders;
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(action.fetchOrder(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));