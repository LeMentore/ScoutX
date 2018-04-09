import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes'

const initialState = {
    places: []
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
                })
            };

        default:
            return state
    }
};

export default placesReducer