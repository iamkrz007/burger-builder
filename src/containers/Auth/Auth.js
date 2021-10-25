import React, { useState, useCallback, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import './Auth.css';
import * as action from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updatedObject, checkValidity } from '../../shared/utility';
const Auth = (props) => {

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false

        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false

        },
    });

    const [isSignUp, setIsSignUp] = useState(true);

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') {
            props.onSetAuthRedirtectPath();
        }
    }, [props.building]);
  
    const switchAuthModeHandler = useCallback(() => {
        setIsSignUp(v => !v);
    }, [isSignUp])

    const inputChangedHander = (event, ControlName) => {
        const updatedControls = updatedObject(controls, {
            [ControlName]: updatedObject(controls[ControlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[ControlName].validation),
                touched: true
            })
        })
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp)

    }

    const formElementArray = [];
    for (let key in controls) {
        formElementArray.push({
            id: key,
            config: controls[key],
        })
    }

    let form = formElementArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHander(event, formElement.id)} />
    ));

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }
    let authRedirect = null
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }
    return (
        <div className="Auth">
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btntype='Success' >{isSignUp ? 'REGISTER' : 'LOGIN'}</Button>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btntype='Danger' >SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )

};
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.idToken !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(action.auth(email, password, isSignUp)),
        onSetAuthRedirtectPath: () => dispatch(action.setAuthRedirectPath('/')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);