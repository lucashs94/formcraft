import { useDesigner } from '@/contexts/DesignerContext'
import { FormElementsSidebar } from './Sidebar/FormElementsSidebar'
import { PropertiesFormSidebar } from './Sidebar/PropertiesFormSidebar'

export function DesignerSidebar() {
  const { selectedElement } = useDesigner()

  return (
    <aside
      className="w-[400px] max-w-[400px] flex flex-col flex-grow 
      gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full"
    >
      {!selectedElement ? <FormElementsSidebar /> : <PropertiesFormSidebar />}
    </aside>
  )
}
