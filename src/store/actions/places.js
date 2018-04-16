import { ADD_PLACE, DELETE_PLACE } from './actionTypes'

export const addPlace = (placeName, location, image) => {
    const placeData = {
        name: placeName,
        location: location,
        image: image
    }
    return dispatch => {
        fetch('https://scoutx-1523612790305.firebaseio.com/places.json', {
            method: 'POST',
            body: JSON.stringify(placeData)
        })
            .catch(error => console.log(error))
            .then(response => response.json())
            .then(parsedResponse => console.log(parsedResponse))
    }
}

export const deletePlace = key => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    }
}