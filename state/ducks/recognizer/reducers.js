import * as types from './types'
import createReducer from '../utils/createReducer'

const initialState = {
  isFaceRecognized: false
}

const recognizerReducer = createReducer(initialState)({
  [types.IS_FACE_RECOGNIZED] (state, action) {
    return { ...state, isFaceRecognized: action.payload }
  }
})

export default recognizerReducer