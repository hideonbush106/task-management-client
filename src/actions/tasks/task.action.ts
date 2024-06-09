'use server'

import { TaskPriority, TaskStatus } from '~/contracts/constant'
import { callAuthApi } from '../action'
import { cookies } from 'next/headers'
import { ITask, ITaskRequest, ITaskUpdateRequest } from './task.interface'
import { CgDetailsMore } from 'react-icons/cg'

const ROOT_ENDPOINT_TASK = 'task'

export const getTaskList = async (taskPriority?: TaskPriority, taskStatus?: TaskStatus) => {
  try {
    const cookieStore = cookies()
    const params = {}
    if (taskPriority)
      Object.assign(params, {
        priority: taskPriority
      })
    if (taskStatus)
      Object.assign(params, {
        status: taskStatus
      })
    const response = await callAuthApi<ITask[]>(
      { method: 'get', endpoint: ROOT_ENDPOINT_TASK, params: params },
      cookieStore
    )
    return response
  } catch (error) {
    return JSON.stringify(error)
  }
}

export const createTask = async (payload: ITaskRequest) => {
  try {
    const cookieStore = cookies()
    const response = await callAuthApi<{ success: boolean }>(
      { method: 'post', endpoint: ROOT_ENDPOINT_TASK, body: payload },
      cookieStore
    )
    return response
  } catch (error) {
    return JSON.stringify(error)
  }
}

export const updateTask = async (id: string, payload: ITaskUpdateRequest) => {
  try {
    const cookieStore = cookies()
    const response = await callAuthApi<ITask>(
      { method: 'patch', endpoint: `${ROOT_ENDPOINT_TASK}/${id}`, body: payload },
      cookieStore
    )
    return response
  } catch (error) {
    return JSON.stringify(error)
  }
}

export const deleteTask = async (id: string) => {
  try {
    const cookieStore = cookies()
    const response = await callAuthApi<{ success: boolean }>(
      { method: 'delete', endpoint: `${ROOT_ENDPOINT_TASK}/${id}` },
      cookieStore
    )
    return response
  } catch (error) {
    return JSON.stringify(error)
  }
}
