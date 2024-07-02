import { useTimer } from '../hooks/use-timer'
import { cn } from '../utils/cn'

export const Timer = () => {
  const { milliseconds, seconds, minutes, isPreparing, isRunning } = useTimer()

  return (
    <div
      className={cn(
        'flex gap-2 p-2 font-tech-mono text-9xl',
        isPreparing && 'text-rose-500',
        isRunning && 'text-emerald-600',
      )}
    >
      {minutes > 0 && (
        <>
          <span>{minutes.toString().padStart(2, '0')}</span>
          <span>:</span>
        </>
      )}

      <span>{seconds.toString().padStart(2, '0')}</span>
      <span>:</span>
      <span>{milliseconds.toString().padStart(2, '0')}</span>
    </div>
  )
}
