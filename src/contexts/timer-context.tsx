import { createContext } from 'react'

export type FormatedTime = {
  time: number
  milliseconds: number
  seconds: number
  minutes: number
  display: string
}

interface TimerContextData {
  // inspectionTime: number
  time: number
  milliseconds: number
  seconds: number
  minutes: number
  isRunning: boolean
  isPreparing: boolean
  isInspecting: boolean
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
  setIsPreparing: React.Dispatch<React.SetStateAction<boolean>>
  setIsInspecting: React.Dispatch<React.SetStateAction<boolean>>
  toggleTimer: () => void
  togglePreparation: () => void
  toggleInspection: () => void
  resetTimer: () => void
  formatTime: (time: number) => FormatedTime
}

export const timerContext = createContext({} as TimerContextData)
