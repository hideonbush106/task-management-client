import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import React from 'react'
import { MdDelete } from 'react-icons/md'
import { deleteTask } from '~/actions/tasks/task.action'
import { notifyError } from '~/utils/toastify'

interface IDeleteTaskModal {
  id: string
  title: string
  handleRefresh: () => Promise<void>
}

const DeleteTaskModal = ({ id, title, handleRefresh }: IDeleteTaskModal) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const deleteData = async (id: string) => {
    const response = (await deleteTask(id)) as {
      success: boolean
    }
    if (response.success === true) {
      handleRefresh()
    } else {
      const error = JSON.parse(response as unknown as string)
      notifyError(error.message)
    }
  }

  return (
    <>
      <Button onPress={onOpen} className='text-lg ml-2' isIconOnly variant='shadow' color='danger'>
        <MdDelete />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create new task</ModalHeader>
              <ModalBody>Are you sure you want to delete {title}</ModalBody>
              <ModalFooter>
                <Button color='primary' variant='flat' onPress={onClose}>
                  Cancel
                </Button>
                <Button onClick={() => deleteData(id)} color='danger' onPress={onClose}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteTaskModal
