import AsyncStorage from '@react-native-community/async-storage';
import { authorize } from 'react-native-app-auth';

const config = {
    issuer: 'http://192.168.0.44:5000',
    clientId: 'native.code',
    redirectUrl: 'io.identityserver.demo:/oauthredirect',  
    scopes: ['openid', 'profile', 'offline_access'],
    dangerouslyAllowInsecureHttpRequests: true
  };

export const saveToken = (token) => {
    return {
        type: 'SAVE_TOKEN',
        payload: token
    };
};

export const removeToken = () => {
    return {
        type: 'REMOVE_TOKEN'
    };
};

export const error = error => {
    return {
        type: 'ERROR',
        payload: error
    };
};

export const getUserToken = () => async dispatch => {
    await AsyncStorage.getItem('token')
        .then((token) => {
            if (token !== null) {                
                dispatch(saveToken(token));
            }
        })
        .catch((err) => {
            dispatch(error(err.message || 'ERROR'));
        });
}

export const logIn = () => async dispatch => {
    await authorize(config).then(async (token) => {
        await AsyncStorage.setItem('token', JSON.stringify(token))
        .then(() => {
            console.log("Guardando token");
            dispatch(saveToken(token));
        })
        .catch((err) => {
            dispatch(error(err.message || 'ERROR'));
        });
    }).catch((err) => {
        dispatch(error(err.message || 'ERROR'));
    });    
}

export const logOut = () => dispatch =>
    AsyncStorage.removeItem('userToken')
        .then(() => {
            dispatch(removeToken());
        })
        .catch((err) => {
            dispatch(error(err.message || 'ERROR'));
        })