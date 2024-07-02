import { useContext } from 'react'

import { timerConfigContext } from '../contexts/timer-config-context'

export const useTimerConfig = () => {
  return useContext(timerConfigContext)
}
