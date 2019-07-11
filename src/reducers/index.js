import { combineReducers } from 'redux';

const AuthReducer = (state = {
    isSignedIn: false,
    token: {},
    error: null
}, action) => {
    switch (action.type) {
        case 'SAVE_TOKEN':
            return {...state, token: action.payload, isSignedIn: true};
        case 'REMOVE_TOKEN':
            return {...state, token: {}, isSignedIn: false};
        case 'ERROR':
            return {...state, error: action.payload};
        default:
            return state;
    }
};

export default combineReducers({
    token: AuthReducer
});