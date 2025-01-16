import { axios } from '~/utils/axios'

export const getSources = () => {
  return axios({
    url: '/source',
  })
}
