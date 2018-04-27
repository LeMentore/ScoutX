import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes'
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
                    dispatch(authSetToken(parsedResponse.idToken))
                    startMainTabs()
                }
                console.log(parsedResponse)
            })
    }
}

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
}