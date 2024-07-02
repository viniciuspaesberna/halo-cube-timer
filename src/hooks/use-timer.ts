import { useContext } from 'react'

import { timerContext } from '../contexts/timer-context'

export const useTimer = () => {
  return useContext(timerContext)
}
