import * as types from './types'
import createReducer from '../utils/createReducer'

const initialState = {
  isFaceRecognized: false,
  isFaceDetected: false,
  isBatchSent: false,
  recognizerResult: [],
  recognizerAverage: [],
  batch: [],
  isTraining: false,
  wasTrained: false,
}

const recognizerReducer = createReducer(initialState)({
  [types.IS_FACE_RECOGNIZED] (state, action) {
    return { ...state, isFaceRecognized: action.payload }
  },
  [types.IS_FACE_DETECTED] (state, action) {
    return { ...state, isFaceDetected: action.payload }
  },
  [types.SAVE_BATCH_IN_MEMORY] (state, action) {
    return { ...state, batch: state.batch.concat(action.payload) }
  },
  [types.SENDING_BATCH_TO_SERVER] (state, action) {
    return { ...state, isBatchSent: action.payload }
  },
  [types.SEND_RECOGNIZER_RESULT] (state, action) {
    let result = state.recognizerResult.concat(action.payload)
    let classNames = []
    let realPayload = []
    let sum = 0
    let divideFactor = 0
    // get classNames with no duplicate... We can replace with guid numbers or whatever
    for (let i = 0; i < result.length; i++) {
      if (!classNames.length && result[i].className !== undefined) classNames.push(result[i].className)
      if (!!classNames.length) {
        for (let j = 0; j < classNames.length; j++) {
          if (classNames[j] !== result[i].className && result[i].className !== undefined) {
            classNames.push(result[i].className)
          }
        }
      }
    }

    classNames = Array.from(new Set(classNames))

    // iterate throught distances, sum it and get average
    for (let j = 0; j < classNames.length; j++) {
      for (let i = 0; i < result.length; i++) {
        if (classNames[j] === result[i].className) {
          sum += result[i].distance
          divideFactor += 1
        }
      }
      realPayload.push({
        className: classNames[j],
        distance: parseFloat(sum / divideFactor).toFixed(2)
      })
      sum = 0
      divideFactor = 0
    }
    return { ...state,
      recognizerResult: state.recognizerResult.concat(action.payload),
      recognizerAverage: state.recognizerAverage = realPayload
    }
  },
  [types.DEFAULT_STATE] (state, action) {
    return { ...state,
      isFaceRecognized: false,
      isFaceDetected: false,
      isBatchSent: false,
      recognizerResult: [],
      recognizerAverage: [],
      batch: [],
      isTraining: false,
      wasTrained: false,
    }
  },
  [types.SET_TRAINING] (state, action) {
    return { ...state, isTraining: action.payload }
  },
  [types.IS_TRAINED] (state, action) {
    return { ...state, wasTrained: action.payload}
  }
})

export default recognizerReducer