'use client'

import { useDesigner } from '@/contexts/DesignerContext'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdCheckbox } from 'react-icons/io'
import { z } from 'zod'
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitValue,
} from '../FormElements'
import { Checkbox } from '../ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

const type: ElementsType = 'CheckboxField'

const extraAttributes = {
  label: 'Checkbox Field',
  helperText: 'This is a helper text',
  required: false,
}

const propertiesSchema = z.object({
  label: z.string().min(4).max(50),
  helperText: z.string().max(200),
  required: z.boolean(),
})

export const CheckboxFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: IoMdCheckbox,
    label: 'Checkbox Field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance

    if (element.extraAttributes.required) {
      return currentValue === 'true'
    }

    return true
  },
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
  const { label, required, helperText } = element.extraAttributes
  const id = `checkbox-${element.id}`

  return (
    <div className="flex items-start space-x-2">
      <Checkbox id={id} />

      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required && ' *'}
        </Label>

        {helperText && (
          <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
        )}
      </div>
    </div>
  )
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance
  submitValue?: SubmitValue
  isInvalid?: boolean
  defaultValue?: string
}) {
  const [value, setValue] = useState<boolean>(
    defaultValue === 'true' ? true : false
  )
  const [error, setError] = useState(false)

  const element = elementInstance as CustomInstance
  const { label, required, helperText, placeholder } = element.extraAttributes

  useEffect(() => {
    setError(isInvalid === true)
  }, [isInvalid])

  const id = `checkbox-${element.id}`

  return (
    <div className="flex items-start space-x-2">
      <Checkbox
        id={id}
        checked={value}
        className={cn('cursor-pointer', error && 'border-red-500')}
        onCheckedChange={(checked) => {
          let value = false
          if (checked === true) value = true

          setValue(value)

          if (!submitValue) return
          const stringValue = value ? 'true' : 'false'
          const valid = CheckboxFieldFormElement.validate(element, stringValue)
          setError(!valid)
          submitValue(element.id, stringValue)
        }}
      />

      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor={id}
          className={cn(error && 'text-red-500')}
        >
          {label}
          {required && ' *'}
        </Label>

        {helperText && (
          <p
            className={cn(
              'text-muted-foreground text-[0.8rem]',
              error && 'text-red-500'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    </div>
  )
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
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur()
                    }
                  }}
                />
              </FormControl>

              <FormDescription>
                The label of the field. <br /> It will be displayed above the
                field.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper text</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur()
                    }
                  }}
                />
              </FormControl>

              <FormDescription>
                The Helper text of the field. <br /> It will be displayed below
                thw field.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="cursor-pointer">Required</FormLabel>

                <FormDescription>The field is required.</FormDescription>
              </div>

              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="cursor-pointer"
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
