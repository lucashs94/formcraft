'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDesigner } from '@/contexts/DesignerContext'
import { Form } from '@/prisma/app/generated/prisma-client'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { ImSpinner2 } from 'react-icons/im'
import { toast } from 'sonner'
import { Designer } from './Designer'
import { DragOverlayWrapper } from './DragOverlayWrapper'
import { PreviewDialogBtn } from './Header/PreviewDialogBtn'
import { PublishFormBtn } from './Header/PublishFormBtn'
import { SaveFormBtn } from './Header/SaveFormBtn'

export function FormBuilder({ form }: { form: Form }) {
  const [isReady, setIsReady] = useState(false)

  const { setElements, setSelectedElement } = useDesigner()

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    if (isReady) return

    const elements = JSON.parse(form.content)
    setElements(elements)
    setSelectedElement(null)
    const readyTimeout = setTimeout(() => setIsReady(true), 300)

    return () => {
      clearTimeout(readyTimeout)
    }
  }, [form, setElements, setSelectedElement])

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin size-12" />
      </div>
    )
  }

  const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />

        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
              🎊🎊 Form Published 🎊🎊
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Anyone with the link can view and submit the form.
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b">
              <Input
                className="w-full"
                readOnly
                value={shareUrl}
              />

              <Button
                className="mt-2 w-full cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl)
                  toast.info('Link copied to clipboard')
                }}
              >
                Copy link
              </Button>
            </div>

            <div className="flex justify-between">
              <Button
                asChild
                variant={'link'}
              >
                <Link
                  href={'/'}
                  className="gap-2"
                >
                  <BsArrowLeft />
                  Go back home
                </Link>
              </Button>

              <Button
                variant={'link'}
                asChild
              >
                <Link href={`/forms/${form.id}`}>
                  Form details
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>

          <div className="items-center gap-2 flex">
            <PreviewDialogBtn />

            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </>
            )}
          </div>
        </nav>

        <div
          className="flex w-full flex-grow items-center justify-center
          relative overflow-y-auto h-[200px] bg-accent 
          bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]"
        >
          <Designer />
        </div>
      </main>

      <DragOverlayWrapper />
    </DndContext>
  )
}
