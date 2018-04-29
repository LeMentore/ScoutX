import { AsyncStorage } from 'react-native'
import { AUTH_SET_TOKEN } from './actionTypes'
import { uiStartLoading, uiCompleteLoading } from './ui'
import startMainTabs from '../../screens/MainTabs/startMainTabs'

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading())
        const apiKey = 'AIzaSyA0594HwEhXIp2M7nsKYDfS1VjvTRocJeE'
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`

        if(authMode === 'signup'){
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(error => {
                console.log(error)
                alert('Auth failed. Try Again...')
                dispatch(uiCompleteLoading())
            })
            .then(response => response.json())
            .then(parsedResponse => {
                dispatch(uiCompleteLoading())
                if(!parsedResponse.idToken){
                    alert('Auth failed. Try Again...')
                } else {
                    dispatch(authStoreToken(parsedResponse.idToken))
                    startMainTabs()
                }
                console.log(parsedResponse)
            })
    }
}

export const authStoreToken = token => {
    return dispatch => {
        dispatch(authSetToken(token))
        AsyncStorage.setItem('ap:auth:token', token)
    }
}

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token
            if(!token){
                AsyncStorage.getItem('ap:auth:token')
                    .catch(error => reject())
                    .then(tokenFromStorage => {
                        dispatch(authSetToken(tokenFromStorage))
                        resolve(tokenFromStorage)
                    })
            } else {
                resolve(token)
            }
        })
        return promise
    }
}