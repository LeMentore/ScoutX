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
                    dispatch(authStoreToken(parsedResponse.idToken, parsedResponse.expiresIn))
                    startMainTabs()
                }
                console.log(parsedResponse)
            })
    }
}

export const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        dispatch(authSetToken(token))
        const now = new Date()
        const expiryDate = now.getTime() + expiresIn * 1000
        AsyncStorage.setItem('ap:auth:token', token)
        AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString())
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
                let fetchedToken
                AsyncStorage.getItem('ap:auth:token')
                    .catch(error => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage
                        if(!tokenFromStorage){
                            reject()
                            return
                        }
                        return AsyncStorage.getItem('ap:auth:expiryDate')
                    })
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate))
                        const now = new Date()
                        if(parsedExpiryDate > now){
                            dispatch(authSetToken(fetchedToken))
                            resolve(fetchedToken)
                        } else {
                            reject()
                        }
                    })
                    .catch(error => reject())
            } else {
                resolve(token)
            }
        })
        promise.catch(error => {
            dispatch(authClearStorage())
        })
        return promise
    }
}

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                startMainTabs()
            })
            .catch(error => console.log('failed to fetch token'))
    }
}

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem('ap:auth:token')
        AsyncStorage.removeItem('ap:auth:expiryDate')
    }
}