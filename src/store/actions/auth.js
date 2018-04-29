import { AsyncStorage } from 'react-native'
import { AUTH_SET_TOKEN } from './actionTypes'
import { uiStartLoading, uiCompleteLoading } from './ui'
import startMainTabs from '../../screens/MainTabs/startMainTabs'

const API_KEY = 'AIzaSyA0594HwEhXIp2M7nsKYDfS1VjvTRocJeE'

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading())
        let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`

        if(authMode === 'signup'){
            url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`
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
                    dispatch(authStoreToken(parsedResponse.idToken, parsedResponse.expiresIn, parsedResponse))
                    startMainTabs()
                }
                console.log(parsedResponse)
            })
    }
}

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        dispatch(authSetToken(token))
        const now = new Date()
        const expiryDate = now.getTime() + expiresIn * 1000
        AsyncStorage.setItem('ap:auth:token', token)
        AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString())
        AsyncStorage.setItem('ap:auth:refreshToken', refreshToken)
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
        return promise.catch(error => {
            return AsyncStorage.getItem('ap:auth:refreshToken')
                .then(refreshToken => {
                    return fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `grant_type=refresh_token&refresh_token=${refreshToken}`
                    })
                })
                .then(response => response.json())
                .then(parsedResponse => {
                    if(parsedResponse.id_token){
                        console.log('refresh token worked')
                        dispatch(authStoreToken(parsedResponse.id_token, parsedResponse.expires_in, parsedResponse.refresh_token))
                        return parsedResponse.id_token
                    } else {
                        dispatch(authClearStorage())
                    }
                })
        })
            .then(token => {
                if(!token){
                    throw (new Error())
                } else {
                    return token
                }
            })
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