import { UpdateFormContent } from '@/actions/Form/updateFormContent'
import { Button } from '@/components/ui/button'
import { useDesigner } from '@/contexts/DesignerContext'
import { useTransition } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { HiSaveAs } from 'react-icons/hi'
import { toast } from 'sonner'

export function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner()

  const [loading, startTransition] = useTransition()

  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements)
      await UpdateFormContent(id, JsonElements)

      toast.success('Form saved successfully')
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }

  return (
    <Button
      variant={'outline'}
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent)
      }}
    >
      <HiSaveAs className="size-4" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  )
}
