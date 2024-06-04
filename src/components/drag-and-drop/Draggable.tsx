import React from 'react'
import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import { Chip } from '@nextui-org/react'

export function Draggable({ id, children }: { id: UniqueIdentifier; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id
  })
  const style = transform
    ? {
        width: 'fit-content',
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined

  return (
    <Chip ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </Chip>
  )
}
