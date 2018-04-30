import { SET_PLACES, DELETE_PLACE, PLACE_ADDED, START_ADD_PLACE } from '../actions/actionTypes'

const initialState = {
    places: [],
    placeAdded: false
}

const placesReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_PLACES:
            return {
                ...state,
                places: action.places,
            }
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== action.key;
                })
            }
        case START_ADD_PLACE:
            return {
                ...state,
                placeAdded: false
            }
        case PLACE_ADDED:
            return {
                ...state,
                placeAdded: true
            }
        default:
            return state
    }
}

export default placesReducer