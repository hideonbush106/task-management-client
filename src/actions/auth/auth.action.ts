'use server'
import { callApi } from '~/actions/action'
import { cookies } from 'next/headers'
import { JwtPayload, decode } from 'jsonwebtoken'
import { ILoginActionData, ILoginActionPayload, IRegisterActionPayload } from './auth.interface'

const ROOT_ENDPOINT = 'auth'

export const decodeToken = () => {
  const token = cookies().get('accessToken')
  if (token) {
    const decodedToken = decode(token.value) as JwtPayload
    return decodedToken
  }
}

const setToken = (token: string) => {
  const decodedToken = decode(token) as JwtPayload

  cookies().set('accessToken', token, {
    httpOnly: true,
    secure: true,
    expires: decodedToken.exp ? decodedToken.exp * 1000 : 60 * 60
  })
}

export const login = async (payload: ILoginActionPayload) => {
  const endpoint = `${ROOT_ENDPOINT}/login`
  try {
    const data = await callApi<ILoginActionData>({ method: 'post', endpoint, body: payload })
    setToken(data.accessToken)
    return true
  } catch (error) {
    return JSON.stringify(error)
  }
}

export const registerUser = async (payload: IRegisterActionPayload) => {
  const endpoint = `${ROOT_ENDPOINT}/register`
  try {
    await callApi({ method: 'post', endpoint, body: payload })
    return true
  } catch (error) {
    return JSON.stringify(error)
  }
}

export const logout = () => {
  cookies().delete('accessToken')
}
