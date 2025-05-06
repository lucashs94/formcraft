'use server'

import { prisma } from '@/prisma'
import { formSchema, formSchemaType } from '@/schemas/form'
import { auth } from '@clerk/nextjs/server'

export async function CreateForm(data: formSchemaType) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('unauthenticated')
  }

  const validation = formSchema.safeParse(data)

  if (!validation.success) {
    throw new Error('form not valid')
  }

  const form = await prisma.form.create({
    data: {
      userId,
      name: data.name,
      description: data.description,
    },
  })

  if (!form) {
    throw new Error('Form creation failed')
  }

  return form.id
}
