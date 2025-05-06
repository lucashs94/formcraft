import { ElementsType, FormElements } from '@/components/FormElements'
import { useDesigner } from '@/contexts/DesignerContext'
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { useState } from 'react'
import { SidebarBtnElementsDragOverlay } from './Sidebar/SidebarBtnElements'

export function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)

  const { elements } = useDesigner()

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel: () => {
      setDraggedItem(null)
    },
    onDragEnd: () => {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) return null

  let node = <div>No Overlay</div>

  const isSidebarBtnElement = draggedItem?.data.current?.isDesignerBtnElement

  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType
    node = <SidebarBtnElementsDragOverlay formElement={FormElements[type]} />
  }

  const isDesignerElement = draggedItem?.data.current?.isDesignerElement

  if (isDesignerElement) {
    const elementId = draggedItem?.data.current?.elementId
    const element = elements.find((el) => el.id === elementId)

    if (!element) node = <div>No element found</div>
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent

      node = (
        <div className="flex w-full h-[120px] rounded-md bg-accent px-4 py-2 opacity-80 pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      )
    }
  }

  return <DragOverlay>{node}</DragOverlay>
}
