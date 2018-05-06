import axios from 'axios'
import { baseURL } from './consts'

const detectFaces = `${baseURL}/detect-faces`

export const postDetectFaces = (image) => {
  const data = {
    image
  }
  return axios.post(detectFaces, data)
}
