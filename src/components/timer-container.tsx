import { Pause, Play, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { Timer } from '@/components/timer'
import { useSolves } from '@/hooks/use-solves'
import { useTimer } from '@/hooks/use-timer'
import { cn } from '@/utils/cn'

export const TimerContainer = () => {
  const { saveTime, generateScramble, scramble } = useSolves()

  const { toggleTimer, resetTimer, isRunning, isPreparing, setIsPreparing } =
    useTimer()

  const timerContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (timerContainerRef.current) {
      timerContainerRef.current.focus()
    }
  }, [])

  const handleFocus = () => {
    if (timerContainerRef.current) {
      timerContainerRef.current.focus()
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keyPressed = e.code

    if (keyPressed === 'Escape') {
      if (!isRunning) resetTimer()
      if (isRunning) toggleTimer()
    }

    if (keyPressed === 'Space') {
      if (!isRunning) {
        setIsPreparing(true)
        resetTimer()
      } // set preparing to true if timer is not running

      if (isRunning) {
        toggleTimer()
        saveTime()
        generateScramble()
      } // turn off isRunning if it was running
    }
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keyPressed = e.code

    if (keyPressed === 'Space') {
      if (isPreparing && !isRunning) toggleTimer() // toggle on the timer if user was preparing
      setIsPreparing(false) // toggle off preparing
    }
  }

  return (
    <div
      className={cn(
        'relative flex flex-1 flex-col items-center justify-center text-zinc-400 ring-white transition-colors',
        'focus:text-white focus:outline-none',
      )}
      ref={timerContainerRef}
      tabIndex={0}
      onClick={handleFocus}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      <div className="absolute right-8 top-8 flex gap-4">
        <button
          type="button"
          className={cn(
            'rounded-md p-2 text-zinc-200 ring-1 ring-zinc-200',
            'disabled:cursor-not-allowed disabled:text-zinc-600 disabled:ring-zinc-600',
          )}
          onClick={toggleTimer}
        >
          {isRunning ? <Pause /> : <Play />}
        </button>

        <button
          type="button"
          className={cn(
            'rounded-md p-2 text-zinc-200 ring-1 ring-zinc-200',
            'disabled:cursor-not-allowed disabled:text-zinc-600 disabled:ring-zinc-600',
          )}
          disabled={isRunning}
          onClick={resetTimer}
        >
          <X />
        </button>
      </div>

      <Timer />

      <footer className="absolute bottom-0 flex w-full justify-center py-12">
        <div className="flex gap-4 text-2xl text-white">
          {scramble.map((moviment, index) => (
            <span key={moviment + index}>{moviment}</span>
          ))}
        </div>
      </footer>
    </div>
  )
}
