import { Root } from "config"

export const audioList = data => {
    return dispatch => {
        dispatch({ type: 'AUDIOLIST', data })
    }
}

export const selectedAudio = data => {
    return dispatch => {
        dispatch({ type: 'SELECTEDAUDIO', data })
    }
}

export const playAudio = (audio, audio_id) => {
    return dispatch => {
        dispatch({ type: 'PLAYAUDIO', audio, audio_id })
    }
}

export const updateAudioStyle = data => {
    return (dispatch, getState) => {
        var colors = Root.defaultColors.concat(getState().color.colorsList)
        var graph_color = colors.filter(e => e._id == data.color.color)[0]
        dispatch({ type: 'SELECTEDCOLOR', data: graph_color })
        dispatch({ type: 'SELECTEDBACKGROUND', data: data.color.backgroundColor })
        dispatch({ type: "GRAPH_TYPE", data: data.style.graph_type })
        dispatch({ type: "BAR_WIDTH", data: data.style.bar_width })
        dispatch({ type: "BAR_SPACE", data: data.style.bar_space })
        dispatch({ type: "CIRCLE_RADIUS", data: data.style.circle_radius })
        dispatch({ type: "CIRCLE_ROTATE", data: data.style.circle_rotate })
        dispatch({ type: "BAR_SHAPE", data: data.style.bar_shape })
        dispatch({ type: 'SETTEXT', data: data.text.displayText })
        dispatch({ type: 'SETFONT', data: data.text.textFont })
        dispatch({ type: 'SETTEXTCOLOR', data: data.text.textColor })
        dispatch({ type: 'SETFONTSIZE', data: data.text.fontSize })
        dispatch({ type: 'TEXTJUSTIFICATION', data: data.text.textJustification })
        dispatch({ type: 'TEXTVERTICALALIGN', data: data.text.textVerticalAlign })
    }
}