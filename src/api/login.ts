import { axios } from '~/utils/axios'

export interface LoginQrCodeResponse {
  unikey: string
}

export const getLoginQRCode = () => {
  return axios<LoginQrCodeResponse>({
    url: '/auth/unikey',
  })
}

export interface LoginStatusResponse {
  code: number
  token: string
  message: string
}
export const getQRcodeStatus = (unikey: string) => {
  return axios<LoginStatusResponse>({
    url: '/auth/check',
    params: {
      unikey,
    },
  })
}
