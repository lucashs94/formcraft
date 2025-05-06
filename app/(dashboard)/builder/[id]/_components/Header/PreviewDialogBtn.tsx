import { FormElements } from '@/components/FormElements'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useDesigner } from '@/contexts/DesignerContext'
import { MdPreview } from 'react-icons/md'

export function PreviewDialogBtn() {
  const { elements } = useDesigner()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="gap-2"
        >
          <MdPreview className="size-4" />
          Preview
        </Button>
      </DialogTrigger>

      <DialogContent className="w-screen h-screen max-w-full max-h-screen sm:w-screen sm:h-screen sm:max-w-full sm:max-h-screen flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg to-muted-foreground font-bold">Form preview</p>

          <p className="text-sm to-muted-foreground">
            This is how your form will look like to your users.
          </p>
        </div>

        <div
          className="bg-accent flex flex-col flex-grow items-center justify-center 
        p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto"
        >
          <div className="max-w-[620px] flex flex-col flex-grow gap-4 bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent

              return (
                <FormComponent
                  key={element.id}
                  elementInstance={element}
                />
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
