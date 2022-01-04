export const setText = (data) => {
    return dispatch => {
        dispatch({ type: 'SETTEXT', data })
    }
}

export const setFont = (data) => {
    return dispatch => {
        dispatch({ type: 'SETFONT', data })
    }
}

export const setTextColor = (data) => {
    return dispatch => {
        dispatch({ type: 'SETTEXTCOLOR', data })
    }
}

export const setFontSize = (data) => {
    return dispatch => {
        dispatch({ type: 'SETFONTSIZE', data })
    }
}

export const setJustification = (data) => {
    return dispatch => {
        dispatch({ type: 'TEXTJUSTIFICATION', data })
    }
}

export const setVerticalAlign = (data) => {
    return dispatch => {
        dispatch({ type: 'TEXTVERTICALALIGN', data })
    }
}