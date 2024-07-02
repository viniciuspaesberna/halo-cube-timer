import * as Switch from '@radix-ui/react-switch'

import { useTimerConfig } from '@/hooks/use-timer-config'
import { cn } from '@/utils/cn'

export const Header = () => {
  const { toggleIsInspectionEnabled, isInspectionEnabled } = useTimerConfig()

  return (
    <header className="flex items-center justify-between border-b border-zinc-800 px-8 py-4">
      <h1 className="text-2xl font-medium">
        Halo <span className="text-emerald-500">Cube</span> Timer
      </h1>

      <div className="flex">
        <div className="flex items-center gap-2">
          <strong>Inspection</strong>

          <Switch.Root
            className={cn(
              'relative h-5 w-10 -translate-x-0 rounded-full bg-zinc-600',
              isInspectionEnabled && 'bg-zinc-400 delay-100',
            )}
            data-state={isInspectionEnabled}
            onClick={toggleIsInspectionEnabled}
          >
            <Switch.Thumb
              className={cn(
                'absolute left-0 top-0 h-5 w-5 rounded-full bg-zinc-800 transition-transform',
                isInspectionEnabled && 'translate-x-5',
              )}
            />
          </Switch.Root>
        </div>
      </div>
    </header>
  )
}
