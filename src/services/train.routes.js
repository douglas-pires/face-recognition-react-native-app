import axios from 'axios'
import { baseURL } from './consts'

const trainURL = `${baseURL}/trainer`

export const getTrain = () => {
  return axios.get(trainURL)
}

export const postTrain = (data) => {
  return axios.post(trainURL, data)
}