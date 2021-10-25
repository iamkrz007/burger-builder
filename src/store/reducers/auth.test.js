import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth rreducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            idToken: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
    it('should store the token upon login', () => {
        expect(reducer({
            idToken: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'something',
            userId: 'someThing'

        })).toEqual({
            idToken: 'something',
            userId: 'someThing',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })

});