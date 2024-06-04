import { TaskPriority, TaskStatus } from '~/contracts/constant'

export interface ITaskRequest {
  description?: string | undefined
  title: string
  priority: TaskPriority
}

export interface ITaskUpdateRequest {
  description?: string | undefined
  title: string
  priority: TaskPriority
  status: TaskStatus
}

export interface ITask {
  _id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  createdBy: string
  createdAt: string
  updatedAt: string
}
