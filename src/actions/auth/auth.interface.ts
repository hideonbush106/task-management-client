export interface ILoginActionPayload {
  email: string
  password: string
}

export interface ILoginActionData {
  accessToken: string
}

export interface IRegisterActionPayload {
  fullName: string
  email: string
  password: string
}

export interface IUser {
  fullName: string
  sub: string
  email: string
  iat?: number
  exp?: number
}
