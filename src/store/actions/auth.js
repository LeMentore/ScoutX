import { TRY_AUTH } from './actionTypes'
import { uiStartLoading, uiCompleteLoading } from './ui'
import startMainTabs from '../../screens/MainTabs/startMainTabs'

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        if(authMode === 'login'){

        } else {
            dispatch(authSignUp(authData, authMode))
        }
    }
}

export const authSignUp = (authData => {
    return dispatch => {
        dispatch(uiStartLoading())
        fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA0594HwEhXIp2M7nsKYDfS1VjvTRocJeE', {
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
                if(parsedResponse.error){
                    alert('Auth failed. Try Again...')
                } else {
                    startMainTabs()
                }
                console.log(parsedResponse)
            })
    }
})