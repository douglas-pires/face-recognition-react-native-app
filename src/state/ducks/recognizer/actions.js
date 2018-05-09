import {
  IS_FACE_DETECTED,
  IS_FACE_RECOGNIZED,
  SENDING_BATCH_TO_SERVER,
  SEND_RECOGNIZER_RESULT,
  SAVE_BATCH_IN_MEMORY,
  DEFAULT_STATE,
  SET_TRAINING,
  IS_TRAINED
} from './types'

export const isFaceRecognized = (payload = {}) => ({
  type: IS_FACE_RECOGNIZED,
  payload
})

export const sendingBatchToServer = (payload = {}) => ({
  type: SENDING_BATCH_TO_SERVER,
  payload
})

export const isFaceDetected = (payload = {}) => ({
  type: IS_FACE_DETECTED,
  payload
})

export const sendRecognizerResult = (payload = {}) => ({
  type: SEND_RECOGNIZER_RESULT,
  payload
})

export const saveBatchInMemory = (payload = {}) => ({
  type: SAVE_BATCH_IN_MEMORY,
  payload
})

export const defaultState = (payload = {}) => ({
  type: DEFAULT_STATE,
  payload
})

export const setTraining = (payload = {}) => ({
  type: SET_TRAINING,
  payload
})

export const isTrained = (payload = {}) => ({
  type: IS_TRAINED,
  payload
})