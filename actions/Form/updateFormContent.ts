'use server'

import { prisma } from '@/prisma'
import { auth } from '@clerk/nextjs/server'

export async function UpdateFormContent(id: number, jsonElements: string) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('unauthenticated')
  }

  return await prisma.form.update({
    where: {
      id,
      userId,
    },
    data: {
      content: jsonElements,
    },
  })
}
