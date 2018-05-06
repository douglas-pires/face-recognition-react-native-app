import axios from 'axios'
import { baseURL } from './consts'

const recognizerURL = `${baseURL}/recognizer`

export const postRecognizer = (files) => {
  return axios.post(recognizerURL, files)
}
