import { type ReactNode, useEffect, useState } from 'react'
import { v4 } from 'uuid'

import { type Solve, solvesContext } from '@/contexts/solves-context'
import type { FormatedTime } from '@/contexts/timer-context'
import { useTimer } from '@/hooks/use-timer'
import { scrambleGenerator } from '@/utils/scramble-generator'

export const SolvesProvider = ({ children }: { children: ReactNode }) => {
  const [solves, setSolves] = useState<Solve[]>([])
  const [ao5, setAo5] = useState<FormatedTime | null>(null)
  const [ao12, setAo12] = useState<FormatedTime | null>(null)
  const [scramble, setScramble] = useState<string[]>(scrambleGenerator())

  const { time, formatTime } = useTimer()

  useEffect(() => {
    const localTimes = localStorage.getItem('@halo-cube-timer:times')

    if (localTimes) {
      setSolves(JSON.parse(localTimes))
    }
  }, [])

  const calculateAo5 = (latestSolves: Solve[]): FormatedTime | null => {
    if (latestSolves.length < 5) return null

    const last5Solves = latestSolves.slice(-5).map((t) => t.time)
    const sortedTimes = [...last5Solves].sort((a, b) => a.time - b.time)

    // Remove best and worst times
    const middleThreeTimes = sortedTimes.slice(1, -1)

    // Calculate average
    const sum = middleThreeTimes.reduce((acc, time) => acc + time.time, 0)
    const average = sum / 3

    return formatTime(average)
  }

  const calculateAo12 = (latestSolves: Solve[]): FormatedTime | null => {
    if (latestSolves.length < 12) return null

    const last12Solves = latestSolves.slice(-12).map((t) => t.time)
    const sortedTimes = [...last12Solves].sort((a, b) => a.time - b.time)

    // Remove best and worst times
    const middleThreeTimes = sortedTimes.slice(1, -1)

    // Calculate average
    const sum = middleThreeTimes.reduce((acc, time) => acc + time.time, 0)
    const average = sum / 10

    return formatTime(average)
  }

  const saveTime = () => {
    const formatedTime = formatTime(time)

    const newSolve: Solve = {
      id: v4(),
      time: formatedTime,
      scramble,
    }

    const newSolves = [...solves, newSolve]
    setSolves(newSolves)
    localStorage.setItem('@halo-cube-timer:times', JSON.stringify(newSolves))

    setAo5(calculateAo5(newSolves))
    setAo12(calculateAo12(newSolves))
  }

  const deleteTime = (timeId: string | 'all') => {
    if (timeId === 'all') {
      setSolves([])
      localStorage.removeItem('@halo-cube-timer:times')
      setAo5(null)
      return
    }

    const newSolves = solves.filter((time) => time.id !== timeId)
    setSolves(newSolves)
    setAo5(calculateAo5(newSolves))
    setAo12(calculateAo12(newSolves))
  }

  const generateScramble = () => {
    const newScramble = scrambleGenerator()
    setScramble(newScramble)
  }

  return (
    <solvesContext.Provider
      value={{
        solves,
        ao5,
        ao12,
        saveTime,
        deleteTime,
        generateScramble,
        scramble,
      }}
    >
      {children}
    </solvesContext.Provider>
  )
}
