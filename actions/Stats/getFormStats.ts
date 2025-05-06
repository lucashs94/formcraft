'use server'

import { prisma } from '@/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GetFormStats() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('unauthenticated')
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  })

  const visits = stats._sum.visits || 0
  const submissions = stats._sum.submissions || 0

  let submissionRate = 0
  let bounceRate = 0

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100
    bounceRate = 100 - submissionRate
  }

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  }
}
