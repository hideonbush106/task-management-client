import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const TaskLayout = ({ children }: { children: React.ReactNode }) => {
  const token = cookies().get('accessToken')
  if (!token) redirect('/login')
  return children
}

export default TaskLayout
