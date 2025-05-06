'use server'

import { prisma } from '@/prisma'
import { auth } from '@clerk/nextjs/server'

export async function SubmitForm(formUrl: string, jsonContent: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('unautheticated')

  return await prisma.form.update({
    data: {
      submissions: { increment: 1 },
      FormSubmission: {
        create: {
          content: jsonContent,
        },
      },
    },
    where: {
      shareUrl: formUrl,
      published: true,
    },
  })
}
