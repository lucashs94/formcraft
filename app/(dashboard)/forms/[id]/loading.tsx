import { ImSpinner2 } from 'react-icons/im'

export default function Loading() {
  return (
    <div className="flex items-center h-full justify-center w-full">
      <ImSpinner2 className="animate-spin size-12" />
    </div>
  )
}
