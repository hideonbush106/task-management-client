import { yupResolver } from '@hookform/resolvers/yup'
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
import { MdEdit } from 'react-icons/md'
import { priorityData, statusData } from '~/app/task/page'
import { TaskPriority, TaskStatus } from '~/contracts/constant'
import * as yup from 'yup'
import { ITask, ITaskUpdateRequest } from '~/actions/tasks/task.interface'
import { updateTask } from '~/actions/tasks/task.action'
import { notifyError } from '~/utils/toastify'
interface ITaskDetailModal {
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  id: string
  handleRefresh: () => Promise<void>
}

const UpdateTaskDetailModal = ({ title, description, priority, status, handleRefresh, id }: ITaskDetailModal) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const taskSchema = yup.object({
    title: yup.string().max(30, 'Description is not exceed 30 characters').required('Title is required'),
    description: yup.string().optional().max(200, 'Description is not exceed 200 characters'),
    priority: yup.mixed<TaskPriority>().oneOf(Object.values(TaskPriority)).required('Priority is required'),
    status: yup.mixed<TaskStatus>().oneOf(Object.values(TaskStatus)).required('Status is required')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ITaskUpdateRequest>({
    defaultValues: {
      description: description || '',
      title: title,
      priority: priority,
      status: status
    },
    resolver: yupResolver(taskSchema)
  })

  const updateData = async (id: string, payload: ITaskUpdateRequest) => {
    const response = (await updateTask(id, payload)) as ITask
    if (response.title) {
      handleRefresh()
    } else {
      const error = JSON.parse(response as unknown as string)
      notifyError(error.message)
    }
  }

  const onSubmit: SubmitHandler<ITaskUpdateRequest> = (data) => {
    updateData(id, data)
  }

  return (
    <>
      <Button onPress={onOpen} isIconOnly variant='shadow' color='warning'>
        <MdEdit className='text-lg' />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Edit {title}</ModalHeader>
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
                  <Select
                    isInvalid={!!errors.status}
                    isRequired
                    errorMessage={errors.status?.message}
                    {...register('status')}
                    variant='faded'
                    label='Task status'
                  >
                    {statusData.map((status) => (
                      <SelectItem value={status.value} key={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button type='submit' color='primary' onPress={onClose}>
                    Submit
                  </Button>
                  <Button color='danger' variant='flat' onPress={onClose}>
                    Close
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

export default UpdateTaskDetailModal
