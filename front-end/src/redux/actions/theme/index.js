export const setFullPageLoading = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'FULL_PAGE_LOADING', data: !getState().theme.fp_loading })
    }
}

export const handleActiveTab = (data) => {
    return dispatch => {
        dispatch({ type: 'ACTIVE_TAB', data })
    }
}