'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { FaArrowRight } from 'react-icons/fa'

export default function HomePage() {
  const router = useRouter()

  return (
    <main className='h-screen relative'>
      <div
        style={{
          background:
            'url("https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          filter: 'brightness(45%)'
        }}
        className='h-screen w-full -z-10 absolute'
      ></div>
      <div className='h-screen w-full flex items-start justify-start'>
        <Card className='max-w-[600px] m-24 p-3'>
          <CardHeader className='flex gap-3'>
            <Image
              alt='nextui logo'
              height={40}
              radius='sm'
              src='https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              width={40}
            />
            <div className='flex flex-col'>
              <p className='text-md'>Task Management App</p>
              <p className='text-small text-default-500'>fongnh.tech</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Streamline your workflow with efficient task tracking.</p>
            <Button className='my-3 w-fit' color='primary' onClick={() => router.push('/task')} variant='shadow'>
              Get Started <FaArrowRight />
            </Button>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link isExternal showAnchorIcon href='https://github.com/hideonbush106'>
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
