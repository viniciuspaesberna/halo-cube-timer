import { createContext } from 'react'

import type { FormatedTime } from './timer-context'

export type Solve = {
  id: string
  time: FormatedTime
  scramble: string[]
}

interface SolvesContextData {
  solves: Solve[]
  scramble: string[]
  ao5: FormatedTime | null
  ao12: FormatedTime | null
  generateScramble: () => void
  saveTime: () => void
  deleteTime: (timeId: string | 'all') => void
}

export const solvesContext = createContext({} as SolvesContextData)
