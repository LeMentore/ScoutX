import { UI_START_LOADING, UI_COMPLETE_LOADING } from '../actions/actionTypes'

const initialState = {
    isLoading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return { ...state, isLoading: true }
        case UI_COMPLETE_LOADING:
            return { ...state, isLoading: false }
        default:
            return state
    }
}

export default reducer