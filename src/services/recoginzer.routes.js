import axios from 'axios'
import { baseURL } from './consts'

const recognizerURL = `${baseURL}/recognizer`
console.log(recognizerURL)
export const postRecognizer = async (files) => {
  return await axios.post(recognizerURL, files)
}
