import { createContext } from 'react'

interface TimerConfigContextData {
  isInspectionEnabled: boolean
  setIsInspectionEnabled: React.Dispatch<React.SetStateAction<boolean>>
  toggleIsInspectionEnabled: () => void
}

export const timerConfigContext = createContext({} as TimerConfigContextData)
