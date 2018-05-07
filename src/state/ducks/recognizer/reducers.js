import * as types from './types'
import createReducer from '../utils/createReducer'

const initialState = {
  isFaceRecognized: false,
  isFaceDetected: false,
  isBatchSent: false,
  recognizerResult: []
}

const recognizerReducer = createReducer(initialState)({
  [types.IS_FACE_RECOGNIZED] (state, action) {
    return { ...state, isFaceRecognized: action.payload }
  },
  [types.IS_FACE_DETECTED] (state, action) {
    return { ...state, isFaceDetected: action.payload }
  },
  [types.SENDING_BATCH_TO_SERVER] (state, action) {
    return { ...state, isBatchSent: action.payload }
  },
  [types.SEND_RECOGNIZER_RESULT] (state, action) {
    const result = action.payload
    return { ...state, recognizerResult: state.recognizerResult.concat(action.payload) }
  }
})

export default recognizerReducer