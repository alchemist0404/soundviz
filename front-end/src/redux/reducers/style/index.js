// **  Initial State
const initialState = {
    graph_type: "bar",
    bar_width: 1,
    bar_max_width: 2,
    bar_space: 0,
    circle_radius: 0,
    circle_rotate: 0,
    bar_shape: 0
}

const style = (state = initialState, action) => {
    switch (action.type) {
        case 'GRAPH_TYPE':
            return { ...state, graph_type: action.data }
        case 'BAR_WIDTH':
            return { ...state, bar_width: action.data }
        case 'BAR_MAX_WIDTH':
            return { ...state, bar_max_width: action.data }
        case 'BAR_SPACE':
            return { ...state, bar_space: action.data }
        case 'CIRCLE_RADIUS':
            return { ...state, circle_radius: action.data }
        case 'CIRCLE_ROTATE':
            return { ...state, circle_rotate: action.data }
        case 'BAR_SHAPE':
            return { ...state, bar_shape: action.data }
        default:
            return state
    }
}

export default style