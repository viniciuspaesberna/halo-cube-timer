import { type ReactNode, useEffect, useState } from 'react'

import { type FormatedTime, timerContext } from '@/contexts/timer-context'

interface TimerProviderProps {
  children: ReactNode
}

export const TimerProvider = ({ children }: TimerProviderProps) => {
  const [time, setTime] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isInspecting, setIsInspecting] = useState<boolean>(false)
  const [isPreparing, setIsPreparing] = useState<boolean>(false)

  const milliseconds = Math.floor((time % 1000) / 10)
  const seconds = Math.floor((time / 1000) % 60)
  const minutes = Math.floor((time / (1000 * 60)) % 60)

  useEffect(() => {
    let animationFrameId: number
    let startTime: number

    const updateTimer = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsedTime = timestamp - startTime
      setTime((prevTime) => prevTime + elapsedTime)
      startTime = timestamp
      animationFrameId = requestAnimationFrame(updateTimer)
    }

    if (isRunning) {
      animationFrameId = requestAnimationFrame(updateTimer)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isRunning])

  const toggleTimer = () => {
    setIsRunning((state) => !state)
  }

  const togglePreparation = () => {
    setIsPreparing((state) => !state)
  }

  const toggleInspection = () => {
    setIsPreparing((state) => !state)
  }

  const resetTimer = () => {
    setTime(0)
  }

  const formatTime = (time: number): FormatedTime => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const milliseconds = Math.floor((time % 1000) / 10)

    return {
      time,
      seconds,
      minutes,
      milliseconds,
      display: `${minutes > 0 ? minutes.toString().padStart(2, '0') + ':' : ''}${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`,
    }
  }

  return (
    <timerContext.Provider
      value={{
        time,
        milliseconds,
        seconds,
        minutes,

        isRunning,
        isPreparing,
        isInspecting,

        setIsRunning,
        setIsPreparing,
        setIsInspecting,

        toggleTimer,
        togglePreparation,
        toggleInspection,

        resetTimer,
        formatTime,
      }}
    >
      {children}
    </timerContext.Provider>
  )
}
