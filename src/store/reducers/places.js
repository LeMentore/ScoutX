import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes'

const initialState = {
    places: []
}

const placesReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_PLACE:
            return {
                ...state,
                places: [{
                    key: Date.now().toString(),
                    name: action.placeName,
                    image: { uri: action.image.uri },
                    location: action.location
                },
                    ...state.places]
            }

        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== action.placeKey;
                })
            }

        default:
            return state
    }
}

export default placesReducer