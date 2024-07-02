import { useSolves } from '@/hooks/use-solves'

import { SolveListItem } from './solve-list-item'

export const SolvesList = () => {
  const { solves, ao5, ao12, deleteTime } = useSolves()

  return (
    <aside className="flex w-full max-w-96 flex-col items-center gap-2 bg-zinc-900 p-4">
      <div className="flex w-full items-center justify-between">
        <strong>Your solves</strong>
        <button onClick={() => deleteTime('all')}>Delete all</button>
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <strong>Averages</strong>

        <div className="grid w-full grid-cols-3 gap-1">
          <div className="flex w-full flex-col items-center">
            <span className="font-semibold">Ao5</span>
            <div className="flex w-full justify-center bg-zinc-700 py-2">
              {ao5 ? ao5.display : '...'}
            </div>
          </div>

          <div className="flex w-full flex-col items-center">
            <span className="font-semibold">Ao12</span>
            <div className="flex w-full justify-center bg-zinc-700 py-2">
              {ao12 ? ao12.display : '...'}
            </div>
          </div>

          <div className="flex w-full flex-col items-center">
            <span className="font-semibold">Solves</span>
            <div className="flex w-full justify-center bg-zinc-700 py-2">
              {solves.length}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 overflow-y-hidden">
        {solves.map((solve) => (
          <SolveListItem key={solve.id} solve={solve} />
        ))}
      </div>
    </aside>
  )
}
