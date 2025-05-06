'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { ImShare } from 'react-icons/im'
import { toast } from 'sonner'

export function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input
        value={shareLink}
        readOnly
      />

      <Button
        className="w-[200px] cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(shareLink)
          toast.info('Link copied to clipboard')
        }}
      >
        <ImShare className="size-4 mr-2" />
        Share link
      </Button>
    </div>
  )
}
