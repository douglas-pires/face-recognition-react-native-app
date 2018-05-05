import {
  IS_FACE_RECOGNIZED
} from './types'

export const isFaceRecognized = (payload = {}) => {
  type: IS_FACE_RECOGNIZED,
  payload
}