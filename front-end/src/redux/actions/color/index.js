export const colorList = (data) => {
    return dispatch => {
        dispatch({ type: 'COLORLIST', data })
    }
}

export const selectedColor = (data) => {
    return dispatch => {
        dispatch({ type: 'SELECTEDCOLOR', data })
    }
}

export const selectedBackground = (data) => {
    return dispatch => {
        dispatch({ type: 'SELECTEDBACKGROUND', data })
    }
}

export const backgroundColorList = (data) => {
    return dispatch => {
        dispatch({ type: 'BACKGROUNDCOLORLIST', data })
    }
}