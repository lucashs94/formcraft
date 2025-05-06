'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <h2 className="text-destructive text-4xl">Something went wrong.</h2>

      <Button asChild>
        <Link href={'/'}>Back Home</Link>
      </Button>
    </div>
  )
}
