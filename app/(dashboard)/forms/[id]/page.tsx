import { GetFormById } from '@/actions/Form/getFormById'
import { GetFormWithSubmissions } from '@/actions/Form/getFormWithSubmissions'
import { ElementsType, FormElementInstance } from '@/components/FormElements'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { format, formatDistance } from 'date-fns'
import { ReactNode } from 'react'
import { FaWpforms } from 'react-icons/fa'
import { HiCursorClick } from 'react-icons/hi'
import { LuView } from 'react-icons/lu'
import { TbArrowBounce } from 'react-icons/tb'
import { StatsCard } from '../../page'
import { FormLinkShare } from './_components/FormLinkShare'
import { VisitBtn } from './_components/VisitBtn'

export default async function FormDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const form = await GetFormById(Number(id))

  const { visits, submissions } = form

  let submissionRate = 0
  let bounceRate = 0

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100
    bounceRate = 100 - submissionRate
  }

  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container mx-auto px-8">
          <h1 className="text-4xl truncate font-bold">{form.name}</h1>

          <VisitBtn shareUrl={form.shareUrl} />
        </div>
      </div>

      <div className="py-4 border-b border-muted">
        <div className="flex justify-between container mx-auto px-8 gap-2 items-center">
          <FormLinkShare shareUrl={form.shareUrl} />
        </div>
      </div>

      <div
        className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 
        lg:grid-cols-4 container mx-auto px-8"
      >
        <StatsCard
          title="Total visits"
          icon={<LuView className="text-blue-600" />}
          helperText="All time form visits"
          value={visits.toLocaleString() || ''}
          loading={false}
          className="shadow-md shadow-blue-600"
        />

        <StatsCard
          title="Total submissions"
          icon={<FaWpforms className="text-yellow-600" />}
          helperText="All time form submissions"
          value={submissions.toLocaleString() || ''}
          loading={false}
          className="shadow-md shadow-yellow-600"
        />

        <StatsCard
          title="Submission rate"
          icon={<HiCursorClick className="text-green-600" />}
          helperText="Visits that resulted in a submission"
          value={submissionRate.toFixed(2) + '%' || ''}
          loading={false}
          className="shadow-md shadow-green-600"
        />

        <StatsCard
          title="Bounce rate"
          icon={<TbArrowBounce className="text-red-600" />}
          helperText="Visits that leave without interacting"
          value={bounceRate.toFixed(2) + '%' || ''}
          loading={false}
          className="shadow-md shadow-red-600"
        />
      </div>

      <div className="container mx-auto px-8 pt-10">
        <SubmissiosnsTable id={form.id} />
      </div>
    </>
  )
}

type Column = {
  id: string
  label: string
  required: boolean
  type: ElementsType
}

type Row = {
  [key: string]: string
} & {
  submittedAt: Date
}

async function SubmissiosnsTable({ id }: { id: number }) {
  const form = await GetFormWithSubmissions(id)

  if (!form) throw new Error('Form not found')

  const formElements = JSON.parse(form.content) as FormElementInstance[]

  const columns: Column[] = []
  const rows: Row[] = []

  formElements.forEach((element) => {
    switch (element.type) {
      case 'TextField':
      case 'NumberField':
      case 'TextAreaField':
      case 'DateField':
      case 'SelectField':
      case 'CheckboxField':
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        })
        break
      default:
        break
    }
  })

  form.FormSubmission.forEach((submission) => {
    const content = JSON.parse(submission.content)

    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    })
  })

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className="uppercase"
                >
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value

  switch (type) {
    case 'DateField':
      if (!value) break
      const date = new Date(value)
      node = <Badge variant={'outline'}>{format(date, 'dd/MM/yyyy')}</Badge>

      break
    case 'CheckboxField':
      const checked = value === 'true'
      node = (
        <Checkbox
          checked={checked}
          disabled
        />
      )

      break
  }

  return <TableCell>{node}</TableCell>
}
