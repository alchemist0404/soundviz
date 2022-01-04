// **  Initial State
const initialState = {
  userData: {},
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, userData: action.data }
    case 'LOGOUT':
      return { ...state, userData: {} }
    default:
      return state
  }
}

export default auth
