import { Card, CardBody, CardHeader, Chip, Divider } from '@nextui-org/react'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { FaRegClock } from 'react-icons/fa6'
import { TaskPriority, TaskStatus } from '~/contracts/constant'
import TaskDetailModal from '~/components/modal/UpdateTaskDetailModal'
import DeleteTaskModal from '../modal/DeleteTaskModal'

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
            <p className='ml-1'>{dateFormat.format('DD/MM/YYYY - HH:mm:ss')}</p>
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
      </Card>
    </>
  )
}

export default TaskCard
