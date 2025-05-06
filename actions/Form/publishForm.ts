'use server'

import { prisma } from '@/prisma'
import { auth } from '@clerk/nextjs/server'

export async function PublishForm(id: number) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthenticated')

  return await prisma.form.update({
    where: {
      userId,
      id,
    },
    data: {
      published: true,
    },
  })
}
