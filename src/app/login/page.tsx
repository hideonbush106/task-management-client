'use client'

import { useState } from 'react'
import LoginCard from '~/components/card/LoginCard'
import RegisterCard from '~/components/card/RegisterCard'

export default function LoginPage() {
  const [loginCard, setLoginCard] = useState(true)
  const toggleCard = () => setLoginCard(!loginCard)

  return (
    <main className='h-screen relative'>
      <div
        style={{
          background: 'url("/login.jpg")',
          backgroundSize: 'cover',
          filter: 'brightness(45%)'
        }}
        className='h-screen w-full -z-10 absolute'
      ></div>
      <div className='h-screen w-full flex items-start justify-center'>
        <div className={`z-10 w-[min(100%,32rem)] mt-20 flipper ${loginCard ? '' : 'flip'}`}>
          <LoginCard toggleCard={toggleCard} />
          <RegisterCard toggleCard={toggleCard} />
        </div>
      </div>
    </main>
  )
}
