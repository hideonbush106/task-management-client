import { Card, CardBody, CardHeader, Divider, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import CreateTaskModal from '~/components/modal/CreateTaskModal'

interface IControlPanel {
  handleFilterTaskStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleFilterTaskPriority: (event: React.ChangeEvent<HTMLSelectElement>) => Promise<void>
  status: { value: string; label: string }[]
  priority: { value: string; label: string }[]
  handleRefresh: () => Promise<void>
}

const ControlPanel = ({
  handleFilterTaskStatus,
  handleFilterTaskPriority,
  status,
  priority,
  handleRefresh
}: IControlPanel) => {
  return (
    <Card isBlurred shadow='none' className='mx-6 mt-6 bg-slate-100'>
      <CardHeader>
        <p className='font-bold text-2xl'>✨ Control Panel</p>
      </CardHeader>
      <Divider />
      <CardBody className='w-full flex flex-row items-center max-lg:flex-col max-lg:items-start'>
        <Select
          onChange={handleFilterTaskStatus}
          variant='faded'
          color='primary'
          label='Task status'
          className='max-lg:w-5/6 max-lg:my-2 mx-3 max-w-xs'
        >
          {status.map((status) => (
            <SelectItem value={status.value} key={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          onChange={handleFilterTaskPriority}
          variant='faded'
          color='primary'
          label='Task priority'
          className='max-lg:w-5/6 max-lg:my-2 mx-3 max-w-xs'
        >
          {priority.map((priority) => (
            <SelectItem value={priority.value} key={priority.value}>
              {priority.label}
            </SelectItem>
          ))}
        </Select>
        <CreateTaskModal handleRefresh={handleRefresh} />
      </CardBody>
    </Card>
  )
}

export default ControlPanel
