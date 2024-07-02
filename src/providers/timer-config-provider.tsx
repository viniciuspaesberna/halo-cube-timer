import { type ReactNode, useState } from 'react'

import { timerConfigContext } from '@/contexts/timer-config-context'

interface TimerConfigProviderProps {
  children: ReactNode
}

export const TimerConfigProvider = ({ children }: TimerConfigProviderProps) => {
  const [isInspectionEnabled, setIsInspectionEnabled] = useState<boolean>(false)

  const toggleIsInspectionEnabled = () => {
    setIsInspectionEnabled((state) => !state)
  }

  return (
    <timerConfigContext.Provider
      value={{
        isInspectionEnabled,
        setIsInspectionEnabled,
        toggleIsInspectionEnabled,
      }}
    >
      {children}
    </timerConfigContext.Provider>
  )
}
