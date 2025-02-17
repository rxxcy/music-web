import type { MusicItem } from '~/interface/kuwo'
import { axios } from '~/utils/axios'

export interface SearchParams {
  platform: string
  keyword: string
  page: number
  limit: number
}

export interface UrlParams {
  platform: string
  id: number | string
  quality: string
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
  return axios<{ rows: MusicItem[]; total: number }>({
    url: '/v1/music',
    params,
  })
}

interface UrlResponse {
  format: string
  bitrate: string
  url: string
  sig: string
  rid: string
  type: string
}

export const url = (params: UrlParams) => {
  return axios<UrlResponse>({
    url: '/source/url',
    params,
  })
}
