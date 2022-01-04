// **  Initial State
const initialState = {
    audioList: [],
    playingAudio: null,
    playingAudioId: ""
}

const audio = (state = initialState, action) => {
    switch (action.type) {
        case 'AUDIOLIST':
            return { ...state, audioList: action.data }
        case 'SELECTEDAUDIO':
            return { ...state, selectedAudio: action.data }
        case 'PLAYAUDIO':
            return { ...state, playingAudio: action.audio, playingAudioId: action.audio_id }
        default:
            return state
    }
}

export default audio