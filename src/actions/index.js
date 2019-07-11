import AsyncStorage from '@react-native-community/async-storage';
import { authorize, revoke } from 'react-native-app-auth';

const config = {
    issuer: 'http://192.168.1.128:5000',
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
        .then((t) => {            
            if (t !== null) {     
                const token = JSON.parse(t);           
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

export const logOut = () => async (dispatch, getState) => {
    console.log(getState().token.token.refreshToken);
    await revoke(config, { 
        tokenToRevoke: getState().token.token.refreshToken,
        sendClientId: true}).then(async () => {
        await AsyncStorage.removeItem('userToken')
        .then(() => {
            dispatch(removeToken());
        })
        .catch((err) => {
            dispatch(error(err.message || 'ERROR'));
        });
    });
};
    