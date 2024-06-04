import { Button, Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import React from 'react'

const TopBar = ({ fullName, handleLogout }: { fullName: string; handleLogout: () => void }) => {
  return (
    <Navbar position='static' style={{ height: '6vh' }} className='bg-blue-100'>
      <NavbarBrand>
        <Image
          alt='nextui logo'
          height={40}
          radius='sm'
          src='https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          width={40}
        />
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem>
          <p>Hi, {fullName}</p>
        </NavbarItem>
        <NavbarItem>
          <Button onClick={handleLogout} as={Link} color='danger' variant='flat'>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default TopBar
