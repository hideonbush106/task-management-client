import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider } from '@nextui-org/react'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { FaRegClock } from 'react-icons/fa6'
import { TaskPriority, TaskStatus } from '~/contracts/constant'
import TaskDetailModal from '~/components/modal/UpdateTaskDetailModal'
import DeleteTaskModal from '../modal/DeleteTaskModal'
import { updateTask } from '~/actions/tasks/task.action'
import { ITask, ITaskUpdateRequest } from '~/actions/tasks/task.interface'
import { notifyError } from '~/utils/toastify'
import { RxCheckCircled, RxCrossCircled } from 'react-icons/rx'

interface ITaskCard {
  title: string
  priority: TaskPriority
  updatedAt: string
  description: string
  status: TaskStatus
  id: string
  handleRefresh: () => Promise<void>
}
const TaskCard = ({ title, priority, updatedAt, description, status, id, handleRefresh }: ITaskCard) => {
  const dateFormat = dayjs(updatedAt)
  const [priorityChipColor, setPriorityChipColor] = useState('')

  const updateData = async (id: string, payload: ITaskUpdateRequest) => {
    const response = (await updateTask(id, payload)) as ITask
    if (response.title) {
      handleRefresh()
    } else {
      const error = JSON.parse(response as unknown as string)
      notifyError(error.message)
    }
  }

  useEffect(() => {
    switch (priority) {
      case TaskPriority.CRITICAL:
        setPriorityChipColor('#f8312f')
        break
      case TaskPriority.HIGH:
        setPriorityChipColor('#ff6723')
        break
      case TaskPriority.MEDIUM:
        setPriorityChipColor('#ffb02e')
        break
      case TaskPriority.LOW:
        setPriorityChipColor('#00d26a')
        break
      default:
        break
    }
  }, [priority])

  return (
    <>
      <Card shadow='sm' className='my-2 p-5'>
        <CardHeader className='flex justify-between'>
          <p className='font-bold text-xl'>{title}</p>
          <div>
            <TaskDetailModal
              handleRefresh={handleRefresh}
              id={id}
              description={description}
              priority={priority}
              status={status}
              title={title}
            />
            <DeleteTaskModal title={title} id={id} handleRefresh={handleRefresh} />
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className='flex flex-rows items-center my-2'>
            <FaRegClock className='text-lg' />
            <p className='ml-1'>{dateFormat.format('DD/MM/YYYY - HH:mm')}</p>
          </div>
          <p className='my-4'>{description || 'No description'}</p>
          <Chip
            style={{
              background: priorityChipColor,
              color: priority === TaskPriority.HIGH || priority === TaskPriority.CRITICAL ? 'white' : 'black'
            }}
            className='my-2'
          >
            {priority}
          </Chip>
        </CardBody>
        <Divider />
        <CardFooter>
          {status !== TaskStatus.COMPLETE ? (
            <Button
              onPress={() =>
                updateData(id, {
                  priority: priority,
                  title: title,
                  description: description,
                  status: TaskStatus.COMPLETE
                })
              }
              color='success'
              variant='shadow'
            >
              <RxCheckCircled className='text-xl' />
              Complete
            </Button>
          ) : (
            <Button
              onPress={() =>
                updateData(id, {
                  priority: priority,
                  title: title,
                  description: description,
                  status: TaskStatus.INCOMPLETE
                })
              }
              color='danger'
              variant='shadow'
            >
              <RxCrossCircled className='text-xl' />
              Incomplete
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  )
}

export default TaskCard
