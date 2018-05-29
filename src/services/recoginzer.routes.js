import axios from 'axios'
import { baseURL } from './consts'

const recognizerURL = `${baseURL}/recognizer`

export const postRecognizer = (files) => {
  console.log(recognizerURL)
  return axios.post(recognizerURL, files).then(result => {
    console.log(result)
  }).catch(err => console.log(err))
}
