import { PublishForm } from '@/actions/Form/publishForm'
import { AlertDescription } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { MdOutlinePublish } from 'react-icons/md'
import { toast } from 'sonner'

export function PublishFormBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition()
  const router = useRouter()

  const publishForm = async () => {
    try {
      await PublishForm(id)
      toast.success('Form published successfully.')
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <MdOutlinePublish className="size-4" />
          Publish
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDescription>
            This actions cannot be undone. After publishing you will not be able
            to edit this form
            <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault()
              startTransition(publishForm)
            }}
          >
            Proceed
            {loading && <FaSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
