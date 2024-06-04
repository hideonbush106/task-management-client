import { Button, Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import React from 'react'

const TopBar = ({ fullName, handleLogout }: { fullName: string; handleLogout: () => void }) => {
  return (
    <div style={{ height: '6vh' }} className='bg-blue-100 px-4 flex items-center justify-between'>
      <Link href='/'>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          width={40}
        />
      </Link>
      <div>
        <div className='flex flex-row items-center'>
          <p className='mr-3'>Hi, {fullName}</p>
          <Button onClick={handleLogout} as={Link} color='danger' variant='flat'>
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TopBar
