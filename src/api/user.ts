import { axios } from '~/utils/axios'

export const getAccountInfo = () => {
  return axios({
    url: '/netease/account',
  })
}
