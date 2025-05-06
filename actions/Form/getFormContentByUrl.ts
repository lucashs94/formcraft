'use server'

import { prisma } from '@/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GetFormContentByUrl(formUrl: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('unauthenticated')

  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: { increment: 1 },
    },
    where: {
      shareUrl: formUrl,
    },
  })
}
