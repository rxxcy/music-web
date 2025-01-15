import { axios } from '~/utils/axios'

export interface LoginQrCodeResponse {
  unikey: string | null
  qrurl: string
  qrimg: string
}

export const getLoginQRCode = () => {
  return axios<LoginQrCodeResponse>({
    url: '/netease/loginqr',
  })
}

export interface LoginStatusResponse {
  code: number
  cookie: string
  message: string
}
export const getQRcodeStatus = (key: string) => {
  return axios<LoginStatusResponse>({
    url: '/netease/loginqrcheck',
    params: {
      key,
    },
  })
}
