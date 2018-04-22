import { UI_START_LOADING, UI_COMPLETE_LOADING } from './actionTypes'

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    }
}

export const uiCompleteLoading = () => {
    return {
        type: UI_COMPLETE_LOADING
    }
}