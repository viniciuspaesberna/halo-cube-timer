import { Check, Dices, X } from 'lucide-react'
import { useState } from 'react'

import type { Solve } from '@/contexts/solves-context'
import { useSolves } from '@/hooks/use-solves'
import { cn } from '@/utils/cn'

interface SolveListItemProps {
  solve: Solve
}

export const SolveListItem = ({ solve }: SolveListItemProps) => {
  const [copied, setCopied] = useState(false)

  const { deleteTime } = useSolves()
  const { time, id, scramble } = solve

  const scrableAsText = scramble.join(',')

  const copyScramble = () => {
    navigator.clipboard.writeText(scrableAsText).then(() => {
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1000)
    })
  }

  return (
    <div className="flex w-full items-center justify-between gap-3 bg-zinc-700 p-2">
      <span className="font-medium">{time.display}</span>

      <div className="h-full w-px bg-zinc-600" />

      <small className="flex-1 truncate" title={scrableAsText}>
        {scrableAsText}
      </small>

      <div className="flex items-center gap-1">
        <button
          title="Copy scramble to clipboard"
          className={cn(
            'transition-colors duration-300 hover:bg-zinc-500',
            copied && 'bg-emerald-500 hover:bg-emerald-500',
          )}
          onClick={copyScramble}
        >
          {copied && <Check className="h-4 w-4" />}
          {!copied && <Dices className="h-4 w-4" />}
        </button>

        <button
          title="Delete time"
          className="transition-colors duration-300 hover:bg-rose-500"
          onClick={() => deleteTime(id)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
