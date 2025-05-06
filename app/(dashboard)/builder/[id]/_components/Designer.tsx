'use client'

import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from '@/components/FormElements'
import { Button } from '@/components/ui/button'
import { useDesigner } from '@/contexts/DesignerContext'
import { idGenerator } from '@/helpers/idGenerator'
import { cn } from '@/lib/utils'
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import { useState } from 'react'
import { BiSolidTrash } from 'react-icons/bi'
import { DesignerSidebar } from './DesignerSidebar'

export function Designer() {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner()

  const droppable = useDroppable({
    id: 'design-drop-area',
    data: {
      isDesignDropArea: true,
    },
  })

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event

      if (!active || !over) return

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignDropArea

      const droppingSidebarElementOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea

      // #1
      if (droppingSidebarElementOverDesignerDropArea) {
        const type = active.data?.current?.type
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        )

        addElement(elements.length, newElement)

        return
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement
      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf

      const droppingSidebarElementOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement

      // #2
      if (droppingSidebarElementOverDesignerElement) {
        const type = active.data?.current?.type
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        )

        const overId = over.data?.current?.elementId

        const overElementIndex = elements.findIndex((el) => el.id === overId)
        if (overElementIndex === -1) throw new Error('Element not found')

        let indexForNewElement = overElementIndex

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1
        }

        addElement(indexForNewElement, newElement)

        return
      }

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement

      const droppingDesignerElementOverDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement

      console.log('OVER:', over)
      console.log('ACTIVE:', active)

      // #3
      if (droppingDesignerElementOverDesignerElement) {
        const activeId = active.data?.current?.elementId
        const overId = over.data?.current?.elementId

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        )
        const overElementIndex = elements.findIndex((el) => el.id === overId)

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('Element not found')
        }

        const activeElement = { ...elements[activeElementIndex] }
        removeElement(activeId) // TODO: fix the logic

        let indexForNewElement = overElementIndex
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1
        }

        addElement(indexForNewElement, activeElement)
      }
    },
  })

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null)
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
            droppable.isOver && 'ring-2 ring-primary ring-inset'
          )}
        >
          {!droppable.isOver && elements.length < 1 && (
            <p className="text-3xl to-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}

          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}

          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper
                  key={element.id}
                  element={element}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <DesignerSidebar />
    </div>
  )
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const [mousIsOver, setMouseIsOver] = useState(false)

  const { removeElement, setSelectedElement } = useDesigner()

  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  })

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  })

  const draggable = useDraggable({
    id: element.id + '-drga-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  })

  if (draggable.isDragging) return null

  const DesignerElement = FormElements[element.type].designerComponent

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onPointerEnter={() => setMouseIsOver(true)}
      onPointerLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedElement(element)
      }}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
    >
      <div
        ref={topHalf.setNodeRef}
        className={cn('absolute w-full h-1/2 rounded-t-md')}
      />

      <div
        ref={bottomHalf.setNodeRef}
        className={cn('absolute w-full bottom-0 h-1/2 rounded-b-md')}
      />

      {mousIsOver && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>

          <div className="absolute right-0 h-full">
            <Button
              className={cn(
                'shadow-xs hover:bg-accent hover:text-accent-foreground dark:hover:bg-input/50',
                'flex justify-center h-full border rounded-md rounded-l-none bg-red-500 hover:bg-background cursor-pointer'
              )}
              onClick={(e) => {
                e.stopPropagation()
                removeElement(element.id)
              }}
            >
              <BiSolidTrash className="size-6 text-white" />
            </Button>
          </div>
        </>
      )}

      {topHalf.isOver && (
        <div className="absolute top-0 w-full h-[7px] rounded-md rounded-b-none bg-primary" />
      )}

      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full h-[7px] rounded-md rounded-t-none bg-primary" />
      )}

      <div
        className={cn(
          'flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100',
          mousIsOver && 'opacity-30'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  )
}
