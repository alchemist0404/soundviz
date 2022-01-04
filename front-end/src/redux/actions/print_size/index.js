export const setPrintType = data => {
    return dispatch => {
        dispatch({ type: 'PRINTTYPE', data })
    }
}

export const setPrintSize = data => {
    return dispatch => {
        dispatch({ type: 'PRINTSIZE', data })
    }
}