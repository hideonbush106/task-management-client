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
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdAdd } from 'react-icons/md'
import { ITaskRequest } from '~/actions/tasks/task.interface'
import { TaskPriority } from '~/contracts/constant'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { createTask } from '~/actions/tasks/task.action'
import { notifyError } from '~/utils/toastify'
import { priorityData } from '~/app/task/page'

const taskSchema = yup.object({
  title: yup.string().max(30, 'Description is not exceed 30 characters').required('Title is required'),
  description: yup.string().optional().max(200, 'Description is not exceed 200 characters'),
  priority: yup.mixed<TaskPriority>().oneOf(Object.values(TaskPriority)).required('Priority is required')
})

const CreateTaskModal = ({ handleRefresh }: { handleRefresh: () => Promise<void> }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
    createData(data)
  }

  return (
    <>
      <Button onPress={onOpen} variant='shadow' color='primary'>
        <MdAdd className='text-xl' />
        Create Task
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Create new task</ModalHeader>
                <ModalBody>
                  <Input
                    isInvalid={!!errors.title}
                    isRequired
                    errorMessage={errors.title?.message}
                    {...register('title')}
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
                  <Button type='submit' color='primary' onPress={onClose}>
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
