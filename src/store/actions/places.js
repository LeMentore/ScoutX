import { ADD_PLACE, DELETE_PLACE } from './actionTypes'

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        const placeData = {
            name: placeName,
            location: location,
            image: image
        }
        fetch('https://us-central1-scoutx-1523612790305.cloudfunctions.net/storeImage', {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        })
            .catch(error => console.log(error))
            .then(response => response.json())
            .then(parsedResponse => {
                console.log(parsedResponse)
            })
        // fetch('https://scoutx-1523612790305.firebaseio.com/places.json', {
        //     method: 'POST',
        //     body: JSON.stringify(placeData)
        // })
        //     .catch(error => console.log(error))
        //     .then(response => response.json())
        //     .then(parsedResponse => console.log(parsedResponse))
    }
}

export const deletePlace = key => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
}