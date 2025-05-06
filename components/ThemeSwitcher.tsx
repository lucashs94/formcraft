'use client'

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mouted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mouted) return null

  return (
    <Tabs defaultValue={theme}>
      <TabsList className="border">
        <TabsTrigger
          value="light"
          onClick={() => setTheme('light')}
          className="cursor-pointer"
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>

        <TabsTrigger
          value="dark"
          onClick={() => setTheme('dark')}
          className="cursor-pointer"
        >
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-45 transition-all dark:rotate-0" />
        </TabsTrigger>

        <TabsTrigger
          value="system"
          onClick={() => setTheme('system')}
          className="cursor-pointer"
        >
          <MonitorIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
