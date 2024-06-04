import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdAdd } from 'react-icons/md'
import { ITaskRequest } from '~/actions/tasks/task.interface'
import { TaskPriority } from '~/contracts/constant'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { createTask } from '~/actions/tasks/task.action'
import { notifyError } from '~/utils/toastify'

const priorityData = [
  { value: TaskPriority.LOW, label: '🟩 Low' },
  { value: TaskPriority.MEDIUM, label: '🟨 Medium' },
  { value: TaskPriority.HIGH, label: '🟧 High' },
  { value: TaskPriority.CRITICAL, label: '🟥 Critical' }
]

const taskSchema = yup.object({
  title: yup.string().max(30, 'Description is not exceed 30 characters').required('Title is required'),
  description: yup.string().optional().max(200, 'Description is not exceed 200 characters'),
  priority: yup.mixed<TaskPriority>().oneOf(Object.values(TaskPriority)).required('Priority is required')
})

const CreateTaskModal = ({ handleRefresh }: { handleRefresh: () => Promise<void> }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [titleValidation, setTitleValidation] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ITaskRequest>({
    defaultValues: {
      description: '',
      title: '',
      priority: TaskPriority.LOW
    },
    resolver: yupResolver(taskSchema)
  })

  const createData = async (payload: ITaskRequest) => {
    const response = (await createTask(payload)) as {
      success: boolean
    }
    if (response.success === true) {
      handleRefresh()
    } else {
      const error = JSON.parse(response as unknown as string)
      notifyError(error.message)
    }
    reset({
      description: '',
      title: '',
      priority: TaskPriority.LOW
    })
  }

  const onSubmit: SubmitHandler<ITaskRequest> = (data) => {
    createData({
      title: titleValidation,
      description: data.description,
      priority: data.priority
    })
  }

  return (
    <>
      <Button className='max-lg:my-2 max-lg:mx-3' onPress={onOpen} variant='shadow' color='primary'>
        <MdAdd className='text-xl' />
        Create Task
      </Button>
      <Modal className='max-lg:mb-32 max-lg:w-4/5' isOpen={isOpen} onOpenChange={onOpenChange}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Create new task</ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    isInvalid={!!errors.title}
                    isRequired
                    errorMessage={errors.title?.message}
                    value={titleValidation}
                    onValueChange={setTitleValidation}
                    variant='faded'
                    label='Title'
                  />
                  <Textarea
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                    {...register('description')}
                    variant='faded'
                    label='Description'
                  />
                  <Select
                    isInvalid={!!errors.priority}
                    isRequired
                    errorMessage={errors.priority?.message}
                    {...register('priority')}
                    variant='faded'
                    label='Task priority'
                  >
                    {priorityData.map((priority) => (
                      <SelectItem value={priority.value} key={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='flat' onPress={onClose}>
                    Close
                  </Button>
                  <Button isDisabled={titleValidation === ''} onPress={onClose} type='submit' color='primary'>
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}

export default CreateTaskModal
