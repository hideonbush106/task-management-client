import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  const token = cookies().get('accessToken')
  if (token) redirect('/task')
  return children
}

export default LoginLayout
