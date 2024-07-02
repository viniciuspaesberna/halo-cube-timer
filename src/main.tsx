import '@/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/App.tsx'
import { SolvesProvider } from '@/providers/solves-provider.tsx'
import { TimerConfigProvider } from '@/providers/timer-config-provider.tsx'
import { TimerProvider } from '@/providers/timer-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TimerConfigProvider>
      <TimerProvider>
        <SolvesProvider>
          <App />
        </SolvesProvider>
      </TimerProvider>
    </TimerConfigProvider>
  </React.StrictMode>,
)
