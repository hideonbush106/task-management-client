'use client'

import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { decodeToken, logout } from '~/actions/auth/auth.action'
import { getTaskList } from '~/actions/tasks/task.action'
import TopBar from '~/components/bar/TopBar'
import { TaskPriority, TaskStatus } from '~/contracts/constant'
import ControlPanel from '~/components/bar/ControlPanel'
import TaskCard from '~/components/card/TaskCard'
import { IUser } from '~/actions/auth/auth.interface'
import { ITask } from '~/actions/tasks/task.interface'
import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { Droppable } from '~/components/drag-and-drop/Droppable'

export const priorityData = [
  { value: TaskPriority.LOW, label: '🟩 Low' },
  { value: TaskPriority.MEDIUM, label: '🟨 Medium' },
  { value: TaskPriority.HIGH, label: '🟧 High' },
  { value: TaskPriority.CRITICAL, label: '🟥 Critical' }
]

export const statusData = [
  { value: TaskStatus.INCOMPLETE, label: '❌ Incomplete' },
  { value: TaskStatus.COMPLETE, label: '✅ Complete' }
]

const TaskPage = () => {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null)
  // const draggableMarkup = <Draggable id='draggable'>Drag me</Draggable>
  function handleDragEnd(event: DragEndEvent) {
    const { over } = event

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null)
  }

  const filterInitialData = {
    status: [
      { value: 'ALL', label: 'All' },
      { value: TaskStatus.INCOMPLETE, label: '❌ Incomplete' },
      { value: TaskStatus.COMPLETE, label: '✅ Complete' }
    ],
    priority: [
      { value: 'ALL', label: 'All' },
      { value: TaskPriority.LOW, label: '🟩 Low' },
      { value: TaskPriority.MEDIUM, label: '🟨 Medium' },
      { value: TaskPriority.HIGH, label: '🟧 High' },
      { value: TaskPriority.CRITICAL, label: '🟥 Critical' }
    ]
  }
  const [fullName, setFullName] = useState('')
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [currentPriority, setCurrentPriority] = useState<'ALL' | TaskPriority>('ALL')
  const [status, setStatus] = useState(filterInitialData.status)
  const router = useRouter()

  const getUserData = async () => {
    const data = (await decodeToken()) as IUser
    setFullName(data.fullName)
  }

  const getTaskData = async (taskPriority?: TaskPriority, taskStatus?: TaskStatus) => {
    const data = (await getTaskList(taskPriority, taskStatus)) as ITask[]
    setTaskList(data)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleFilterTaskStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'ALL') setStatus(filterInitialData.status)
    else setStatus(filterInitialData.status.filter((status) => status.value === event.target.value))
  }

  const handleFilterTaskPriority = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPriority(event.target.value as TaskPriority)
    if (event.target.value === 'ALL') {
      await getTaskData()
    } else {
      await getTaskData(event.target.value as TaskPriority)
    }
  }

  const handleRefresh = async () => {
    const priority = currentPriority === 'ALL' ? undefined : currentPriority
    console.log(priority)
    await getTaskData(priority)
  }

  useEffect(() => {
    getUserData()
    getTaskData()
  }, [])

  return (
    <>
      <TopBar handleLogout={handleLogout} fullName={fullName} />
      <main style={{ height: '94vh' }}>
        <ControlPanel
          handleRefresh={handleRefresh}
          handleFilterTaskPriority={handleFilterTaskPriority}
          handleFilterTaskStatus={handleFilterTaskStatus}
          priority={filterInitialData.priority}
          status={filterInitialData.status}
        />
        <div className='flex justify-evenly items-start p-3'>
          <DndContext onDragEnd={handleDragEnd}>
            {status
              .filter((status) => status.value !== 'ALL')
              .map((status) => (
                <Card
                  shadow='lg'
                  style={{ minHeight: '66vh' }}
                  key={status.value}
                  className='w-3/5 bg-slate-50 mx-4 mt-10'
                >
                  <CardHeader>
                    <p className='font-bold text-3xl'>{status.label}</p>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    {taskList
                      .filter((value) => value.status === status.value)
                      .map((value) => (
                        <TaskCard
                          id={value._id}
                          handleRefresh={handleRefresh}
                          status={value.status}
                          priority={value.priority}
                          title={value.title}
                          updatedAt={value.updatedAt}
                          description={value.description}
                          key={value._id}
                        />
                      ))}
                  </CardBody>
                </Card>
              ))}
          </DndContext>
        </div>
      </main>
    </>
  )
}

export default TaskPage
