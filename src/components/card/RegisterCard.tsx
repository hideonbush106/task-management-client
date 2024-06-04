import { Button, Card, CardBody, CardHeader, Divider, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PiEyeSlashFill, PiEyeFill } from 'react-icons/pi'
import { login, registerUser } from '~/actions/auth/auth.action'
import { IRegisterActionPayload } from '~/actions/auth/auth.interface'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { notifyError } from '~/utils/toastify'

const schema = yup
  .object({
    fullName: yup.string().max(30, 'Full name is not exceed 30 characters').required('Fullname is required'),
    email: yup.string().email('Incorrect email format').required('Email is required'),
    password: yup
      .string()

      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      )
  })
  .required()

interface RegisterCardProps {
  toggleCard: () => void
}

const RegisterCard = ({ toggleCard }: RegisterCardProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IRegisterActionPayload>({
    resolver: yupResolver(schema)
  })
  const onSubmit: SubmitHandler<IRegisterActionPayload> = async (data) => {
    setIsLoading(true)
    const response = await registerUser(data)
    if (response === true) {
      const loginResponse = await login({
        email: data.email,
        password: data.password
      })
      if (loginResponse === true) {
        setIsLoading(false)
        window.location.reload
      } else {
        const error = JSON.parse(loginResponse)
        notifyError(error.message)
        setIsLoading(false)
      }
    } else {
      const error = JSON.parse(response)
      notifyError(error.message)
      setIsLoading(false)
    }
  }

  return (
    <Card className='max-w-[32rem] w-[min(100%,32rem)] flex justify-center items-center back absolute p-5'>
      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <h3 className='text-center mt-3 w-full text-4xl font-bold'>Register</h3>
        </CardHeader>
        <CardBody className='p-5 flex justify-center items-center'>
          <Input
            autoFocus
            {...register('fullName', { required: true })}
            isRequired
            variant='bordered'
            className='my-3'
            type='text'
            label='Fullname'
            isInvalid={!!errors.fullName}
            errorMessage={errors.fullName?.message}
          />
          <Input
            {...register('email', { required: true })}
            isRequired
            variant='bordered'
            className='my-3'
            type='email'
            label='Email'
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <Input
            {...register('password', { required: true })}
            isRequired
            label='Password'
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
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
          <Button isLoading={isLoading} type='submit' color='primary' variant='shadow' className='w-2/5 text-white'>
            Register
          </Button>
          <div className='flex justify-center items-center my-4'>
            <Divider className='w-24' />
            <p className='mx-2'>Already have account?</p>
            <Divider className='w-24' />
          </div>
          <Button color='success' onClick={() => toggleCard()} variant='shadow' className='w-2/5 text-white'>
            Login
          </Button>
        </CardBody>
      </form>
    </Card>
  )
}

export default RegisterCard
