import axios from 'axios'
import { baseURL } from './consts'

const trainURL = `${baseURL}/trainer`

export const getTrain = () => {
  return axios.get(trainURL)
}

export const postTrain = (client, batchImages) => {
  const data = {
    metadata: {
      name: client.name
    },
    batch: batchImages
  }
  console.log(data)
  return axios.post(trainURL, data)
}