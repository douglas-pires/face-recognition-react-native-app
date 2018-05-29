import axios from 'axios'
import { baseURL, baseTrainUrl } from './consts'

const trainUrl = `${baseTrainUrl}/trainer`

export const getTrain = () => {
  return axios.get(trainUrl)
}

export const postTrain = (data) => {
  return axios.post(trainUrl, data)
}