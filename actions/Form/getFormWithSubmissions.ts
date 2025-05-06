'use server'

import { prisma } from '@/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GetFormWithSubmissions(id: number) {
  const { userId } = await auth()
  if (!userId) throw new Error('unauthenticated')

  return await prisma.form.findUnique({
    where: {
      userId,
      id,
    },
    include: {
      FormSubmission: true,
    },
  })
}
