import { useContext } from 'react'

import { solvesContext } from '../contexts/solves-context'

export const useSolves = () => {
  return useContext(solvesContext)
}
