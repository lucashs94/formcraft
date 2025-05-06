import { GetFormById } from '@/actions/Form/getFormById'
import { FormBuilder } from './_components/FormBuilder'

export default async function BuilderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const form = await GetFormById(Number(id))

  return <FormBuilder form={form} />
}
