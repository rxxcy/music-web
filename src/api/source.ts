import { axios } from '~/utils/axios'

export interface SearchParams {
  platform: string
  keyword: string
  page: number
  limit: number
}

export interface Platfrom {
  platform: { [key: string]: string }
}

export const platform = () => {
  return axios<Platfrom>({
    url: '/source',
  })
}

export const search = (params: SearchParams) => {
  return axios({
    url: '/source/search',
    params,
  })
}
