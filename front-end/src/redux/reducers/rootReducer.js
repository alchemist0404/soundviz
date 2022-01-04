// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import audio from './audio'
import color from './color'
import style from './style'
import text from './text'
import print_size from './print_size'
import theme from './theme'

const rootReducer = combineReducers({
  auth,
  audio,
  color,
  style,
  text,
  print_size,
  theme
})

export default rootReducer
