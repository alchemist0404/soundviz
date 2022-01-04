import { Root } from "config"

// **  Initial State
const initialState = {
    colorsList: [],
    backgroundColorsList: [],
    graphColor: Root.defaultColors[0],
    backgroundColor: "#FFFFFF"
}

const color = (state = initialState, action) => {
    switch (action.type) {
        case 'COLORLIST':
            return { ...state, colorsList: action.data }
        case 'BACKGROUNDCOLORLIST':
            return { ...state, backgroundColorsList: action.data }
        case 'SELECTEDCOLOR':
            return { ...state, graphColor: action.data }
        case 'SELECTEDBACKGROUND':
            return { ...state, backgroundColor: action.data }
        default:
            return state
    }
}

export default color