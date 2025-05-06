'use client'

import { FormElementInstance } from '@/components/FormElements'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type DesignerContextType = {
  elements: FormElementInstance[]
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>

  addElement: (index: number, element: FormElementInstance) => void
  removeElement: (id: string) => void
  updateElement: (id: string, element: FormElementInstance) => void

  selectedElement: FormElementInstance | null
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>
}

const DesignerContext = createContext<DesignerContextType | null>(null)

export function DesignerContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([])
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null)

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev]
      newElements.splice(index, 0, element)
      return newElements
    })
  }

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id))
  }

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev]
      const index = newElements.findIndex((el) => el.id === id)

      if (index !== -1) {
        newElements[index] = element
      }

      return newElements
    })
  }

  return (
    <DesignerContext.Provider
      value={{
        elements,
        setElements,

        addElement,
        removeElement,
        updateElement,

        selectedElement,
        setSelectedElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  )
}

export function useDesigner() {
  const context = useContext(DesignerContext)
  if (!context) {
    throw new Error('useDesignerContext must be used within a DesignerProvider')
  }
  return context
}
