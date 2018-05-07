import {
  IS_FACE_DETECTED,
  IS_FACE_RECOGNIZED,
  SENDING_BATCH_TO_SERVER,
  SEND_RECOGNIZER_RESULT
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