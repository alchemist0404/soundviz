
// **  Initial State
const initialState = {
    print_type: "digital",
    print_size: "d_p_A4"
}

const print_size = (state = initialState, action) => {
    switch (action.type) {
        case 'PRINTTYPE':
            return { ...state, print_type: action.data }
        case 'PRINTSIZE':
            return { ...state, print_size: action.data }
        default:
            return state
    }
}

export default print_size