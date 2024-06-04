import { Button, Card, CardBody, CardHeader, Divider, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PiEyeSlashFill, PiEyeFill } from 'react-icons/pi'
import { login } from '~/actions/auth/auth.action'
import { ILoginActionPayload } from '~/actions/auth/auth.interface'
import { notifyError } from '~/utils/toastify'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup
  .object({
    email: yup.string().email('Incorrect email format').required('Email is required'),
    password: yup.string().required('Password is required')
  })
  .required()

interface LoginCardProps {
  toggleCard: () => void
}

const LoginCard = ({ toggleCard }: LoginCardProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginActionPayload>({
    resolver: yupResolver(schema)
  })

  const onSubmit: SubmitHandler<ILoginActionPayload> = async (data) => {
    setIsLoading(true)
    const response = await login(data)
    if (response === true) {
      setIsLoading(false)
      router.push('/task')
    } else {
      const error = JSON.parse(response)
      notifyError(error.message)
    }
  }

  return (
    <Card className='max-w-[32rem] w-[min(100%,32rem)] flex justify-center items-center front absolute p-5'>
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <h3 className='text-center mt-3 w-full text-4xl font-bold'>Login</h3>
        </CardHeader>
        <CardBody className='p-5 flex justify-center items-center'>
          <Input
            {...register('email', { required: true })}
            isRequired
            variant='bordered'
            className='my-3'
            type='email'
            label='Email'
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />
          <Input
            {...register('password', { required: true })}
            isRequired
            label='Password'
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            variant='bordered'
            endContent={
              <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                {isVisible ? (
                  <PiEyeSlashFill className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <PiEyeFill className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            className='my-3'
          />
          <Button isLoading={isLoading} type='submit' color='success' variant='shadow' className='w-2/5 text-white'>
            Login
          </Button>
          <div className='flex justify-center items-center my-4'>
            <Divider className='w-24' />
            <p className='mx-2'>Or</p>
            <Divider className='w-24' />
          </div>
          <Button color='primary' onClick={() => toggleCard()} variant='shadow' className='w-2/5 text-white'>
            Register
          </Button>
        </CardBody>
      </form>
    </Card>
  )
}

export default LoginCard
