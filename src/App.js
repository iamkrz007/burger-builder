import React, { useEffect } from 'react';
import './App.css';
import Layout from '../src/hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
});
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
});

function App(props) {


  useEffect(() => {
    props.onTryAutoSignup()
  }, [])

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth" component={asyncAuth} />
      <Redirect to='/' />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/orders" component={asyncOrders} />
        <Redirect to='/' />

      </Switch>
    )
  }


  return (
    <div className="App">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}


const mapDispatchToprops = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToprops)(App));
