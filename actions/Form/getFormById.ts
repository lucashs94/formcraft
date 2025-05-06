'use server'

import { prisma } from '@/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GetFormById(id: number) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('unauthenticated')
  }

  const form = await prisma.form.findUnique({
    where: {
      userId,
      id,
    },
  })

  if (!form) {
    throw new Error('form not found')
  }

  return form
}
