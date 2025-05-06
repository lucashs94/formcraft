'use client'

import { useDesigner } from '@/contexts/DesignerContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LuSeparatorHorizontal } from 'react-icons/lu'
import { z } from 'zod'
import { ElementsType, FormElement, FormElementInstance } from '../FormElements'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Label } from '../ui/label'
import { Slider } from '../ui/slider'

const type: ElementsType = 'SpacerField'

const extraAttributes = {
  height: 20,
}

const propertiesSchema = z.object({
  height: z.number().min(5).max(200),
})

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: LuSeparatorHorizontal,
    label: 'Spacer Field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
}

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) {
  const element = elementInstance as CustomInstance
  const { height } = element.extraAttributes

  return (
    <div className="flex flex-col w-full gap-2 items-center">
      <Label className="text-muted-foreground">Spacer field: {height}px</Label>
      <LuSeparatorHorizontal className="size-8" />
    </div>
  )
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) {
  const element = elementInstance as CustomInstance
  const { height } = element.extraAttributes

  return <div style={{ height, width: '100%' }}></div>
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) {
  const { updateElement } = useDesigner()

  const element = elementInstance as CustomInstance

  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      height: element.extraAttributes.height,
    },
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])

  function applyChanges(values: PropertiesFormSchemaType) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    })
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => e.preventDefault()}
      >
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height: {form.watch('height')}px</FormLabel>

              <FormControl className="pt-2">
                <Slider
                  className="cursor-pointer"
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(val) => {
                    field.onChange(val[0])
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
