'use server'

import { prisma } from '@/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GetForms() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('unauthenticated')
  }

  const forms = await prisma.form.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return forms
}
