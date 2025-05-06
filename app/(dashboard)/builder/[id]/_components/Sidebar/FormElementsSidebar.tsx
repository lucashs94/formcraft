import { FormElements } from '@/components/FormElements'
import { Separator } from '@/components/ui/separator'
import { SidebarBtnElements } from './SidebarBtnElements'

export function FormElementsSidebar() {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag and drop elements</p>

      <Separator className="mb-4 mt-2" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Layout elements
        </p>

        <SidebarBtnElements formElement={FormElements.TitleField} />
        <SidebarBtnElements formElement={FormElements.SubtitleField} />
        <SidebarBtnElements formElement={FormElements.ParagraphField} />
        <SidebarBtnElements formElement={FormElements.SeparatorField} />
        <SidebarBtnElements formElement={FormElements.SpacerField} />

        <Separator className="mt-2 col-span-1 md:col-span-2" />

        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Form elements
        </p>

        <SidebarBtnElements formElement={FormElements.TextField} />
        <SidebarBtnElements formElement={FormElements.NumberField} />
        <SidebarBtnElements formElement={FormElements.TextAreaField} />
        <SidebarBtnElements formElement={FormElements.DateField} />
        <SidebarBtnElements formElement={FormElements.SelectField} />
        <SidebarBtnElements formElement={FormElements.CheckboxField} />
      </div>
    </div>
  )
}
