import { applyScramble, ColorFaces } from './scramble-cube'

enum HexColors {
  white = '#ffffff',
  yellow = '#ffd500',
  blue = '#0046ad',
  green = '#009b48',
  orange = '#ff5800',
  red = '#b71234',
}

type GenerateCubeFaceSVGProps = {
  size?: number
  face?: FaceType
  strokeColor?: string
  strokeWidth?: number
}

export function generateCubeFaceSVG({
  size = 300,
  face = applyScramble(['R'])[ColorFaces.green],
  strokeColor = 'black',
  strokeWidth = 5,
}: GenerateCubeFaceSVGProps) {
  const cellSize = size / 3
  const cells = []

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      cells.push(`
        <rect 
          x="${x * cellSize}" 
          y="${y * cellSize}" 
          width="${cellSize}" 
          height="${cellSize}" 
          fill="${HexColors[face[y][x]]}" 
          stroke="${strokeColor}" 
          stroke-width="${strokeWidth}"
          ${x === 2 && y === 2 && 'id="center"'}
        />
      `)
    }
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
      <g clip-path="url(#face)">
        <rect width="${size}" height="${size}" fill="transparent"/>
        ${cells.join('')}
      </g>
      <defs>
        <clipPath id="face">
          <rect width="${size}" height="${size}" fill="transparent"/>
        </clipPath>
      </defs>
    </svg>
  `
}
