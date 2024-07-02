import { Header } from './components/header'
import { ScramblePreview } from './components/scramble-preview'
import { SolvesList } from './components/solves-list'
import { TimerContainer } from './components/timer-container'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-700 text-zinc-50 antialiased">
      <Header />

      <main className="relative flex h-full flex-1">
        <ScramblePreview />

        <TimerContainer />

        <SolvesList />
      </main>
    </div>
  )
}

export default App
