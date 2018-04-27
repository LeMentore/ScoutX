import { SET_PLACES, DELETE_PLACE } from './actionTypes'
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
                alert('Something went wrong... Please try again')
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
            .then(response => response.json())
            .then(parsedResponse => {
                console.log(parsedResponse)
                dispatch(uiCompleteLoading())
            })
            .catch(error => {
                console.log(error)
                alert('Something went wrong... Please try again')
                dispatch(uiCompleteLoading())
            })
    }
}

export const getPlaces = () => {
    return dispatch => {
        fetch('https://scoutx-1523612790305.firebaseio.com/places.json')
            .then(response => response.json())
            .then(parsedResponse => {
                const places = []
                for(let key in parsedResponse){
                    places.push({
                        ...parsedResponse[key],
                        image: {
                            uri: parsedResponse[key].image
                        },
                        key: key
                    })
                }
                dispatch(setPlaces(places))
            })
            .catch(error => {
                alert('Something went wrong, sorry...')
                console.log(error)
            })
    }
}

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places: places
    }
}

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(removePlace(key));
        fetch("https://scoutx-1523612790305.firebaseio.com/places/" + key + ".json", {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(parsedResponse => {
                console.log("Done!")
            })
            .catch(err => {
                alert("Something went wrong, sorry...")
                console.log(err);
            })
    }
}

export const removePlace = key => {
    return {
        type: DELETE_PLACE,
        key: key
    }
}