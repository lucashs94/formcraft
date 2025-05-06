import { FormElements } from '@/components/FormElements'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useDesigner } from '@/contexts/DesignerContext'
import { AiOutlineClose } from 'react-icons/ai'

export function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner()

  if (!selectedElement) return null

  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p>Element properties</p>

        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => setSelectedElement(null)}
        >
          <AiOutlineClose />
        </Button>
      </div>

      <Separator className="mb-4" />

      <PropertiesForm elementInstance={selectedElement} />
    </div>
  )
}
