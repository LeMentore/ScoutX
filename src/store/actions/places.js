import { ADD_PLACE, DELETE_PLACE } from './actionTypes'
import { uiStartLoading, uiCompleteLoading } from './ui'

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading())
        fetch('https://us-central1-scoutx-1523612790305.cloudfunctions.net/storeImage', {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        })
            .catch(error => {
                console.log(error)
                dispatch(uiCompleteLoading())
            })
            .then(response => response.json())
            .then(parsedResponse => {
                const placeData = {
                    name: placeName,
                    location: location,
                    image: parsedResponse.imageUrl
                }
                return fetch('https://scoutx-1523612790305.firebaseio.com/places.json', {
                    method: 'POST',
                    body: JSON.stringify(placeData)
                })
            })
            .catch(error => {
                console.log(error)
                dispatch(uiCompleteLoading())
            })
            .then(response => response.json())
            .then(parsedResponse => {
                console.log(parsedResponse)
                dispatch(uiCompleteLoading())
            })
    }
}

export const deletePlace = key => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
}