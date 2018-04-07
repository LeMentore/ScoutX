import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from '../actions/actionTypes';

const initialState = {
    places: [],
    selectedPlace: null
};

const placesReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_PLACE:
            return {
                ...state,
                places: [{
                    key: Date.now().toString(),
                    name: action.placeName,
                    image: { uri: 'https://image.freepik.com/free-photo/shiny-night-city_1127-8.jpg' }
                },
                    ...state.places]
            };

        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== state.selectedPlace.key;
                }),
                selectedPlace: null
            };

        case SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find(place => {
                    return place.key === action.placeKey
                })
            };

        case DESELECT_PLACE:
            return {
                ...state,
                selectedPlace: null
            };

        default:
            return state
    }
};

export default placesReducer