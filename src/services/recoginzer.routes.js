import axios from 'axios'
import { baseURL } from './consts'

const recognizerURL = `${baseURL}/recognizer`

export const postRecognizer = async (files) => {
  return await axios.post(recognizerURL, files)
}
