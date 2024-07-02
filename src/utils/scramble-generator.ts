const movements: string[] = ['R', 'L', 'U', 'D', 'F', 'B']
const movementVariants: string[] = ['', "'", '2']

export const scrambleGenerator = (scrambleLength = 20): string[] => {
  const scramble: string[] = []
  const variantPercentage = 65

  let lastAxis: string = ''

  for (let i = 0; i < scrambleLength; i++) {
    let randomMovement: string
    do {
      randomMovement = movements[Math.floor(Math.random() * movements.length)]
    } while (getAxis(randomMovement) === lastAxis)

    const variantChance = Math.floor(Math.random() * 100)
    const variant =
      variantChance <= variantPercentage
        ? movementVariants[Math.floor(Math.random() * 3)]
        : ''

    scramble.push(randomMovement + variant)
    lastAxis = getAxis(randomMovement)
  }

  return scramble
}

function getAxis(move: string): string {
  switch (move) {
    case 'R':
    case 'L':
      return 'RL'
    case 'U':
    case 'D':
      return 'UD'
    case 'F':
    case 'B':
      return 'FB'
    default:
      return ''
  }
}
