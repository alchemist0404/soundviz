import { Root } from "config"

// **  Initial State
const userData = JSON.parse(localStorage.getItem(Root.key))

const initialState = {
    fp_loading: false,
    activeTab: userData ? 0 : 7
}

const theme = (state = initialState, action) => {
    switch (action.type) {
        case 'FULL_PAGE_LOADING':
            return { ...state, fp_loading: action.data }
        case 'ACTIVE_TAB':
            return { ...state, activeTab: action.data }
        default:
            return state
    }
}

export default theme