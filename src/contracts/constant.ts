export enum TaskStatus {
  COMPLETE = 'COMPLETE',
  INCOMPLETE = 'INCOMPLETE'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

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
