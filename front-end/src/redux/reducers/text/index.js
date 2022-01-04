// **  Initial State
const initialState = {
    displayText: "",
    textFont: "Alfa Slab One",
    textColor: "#000000",
    fontSize: 20,
    textJustification: 1,
    textVerticalAlign: 1,
    textInputSize: {
        w: 250,
        h: 30
    },
    textInputPosition: {
        x: 0,
        y: 0
    },
    fontWeight: "normal",
    lineHeight: 1,
    letterSpacing: "0px",
    textAlignment: "left"
}

const text = (state = initialState, action) => {
    switch (action.type) {
        case 'SETTEXT':
            return { ...state, displayText: action.data }
        case 'SETFONT':
            return { ...state, textFont: action.data }
        case 'SETTEXTCOLOR':
            return { ...state, textColor: action.data }
        case 'SETFONTSIZE':
            return { ...state, fontSize: action.data }
        case 'TEXTJUSTIFICATION':
            return { ...state, textJustification: action.data }
        case 'TEXTVERTICALALIGN':
            return { ...state, textVerticalAlign: action.data }
        default:
            return state
    }
}

export default text