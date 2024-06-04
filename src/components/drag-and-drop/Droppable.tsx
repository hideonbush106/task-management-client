import React from 'react'
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core'
import { Card } from '@nextui-org/react'

export function Droppable({ id, children }: { id: UniqueIdentifier; children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id
  })

  return <Card ref={setNodeRef}>{children}</Card>
}
