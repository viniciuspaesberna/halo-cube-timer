// Cube representation:
// 0: White (Top)
// 1: Yellow (Bottom)
// 2: Green (Front)
// 3: Blue (Back)
// 4: Orange (Left)
// 5: Red (Right)

export enum ColorFaces {
  white = 0,
  yellow = 1,
  green = 2,
  blue = 3,
  orange = 4,
  red = 5,
}

export function applyScramble(scramble: string[]): CubeType {
  let cubeState: CubeType = [
    [
      ['white', 'white', 'white'],
      ['white', 'white', 'white'],
      ['white', 'white', 'white'],
    ],
    [
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow'],
      ['yellow', 'yellow', 'yellow'],
    ],
    [
      ['green', 'green', 'green'],
      ['green', 'green', 'green'],
      ['green', 'green', 'green'],
    ],
    [
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue'],
      ['blue', 'blue', 'blue'],
    ],
    [
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
      ['orange', 'orange', 'orange'],
    ],
    [
      ['red', 'red', 'red'],
      ['red', 'red', 'red'],
      ['red', 'red', 'red'],
    ],
  ]

  for (const move of scramble) {
    cubeState = applyMove(cubeState, move)
  }

  return cubeState
}

function applyMove(cube: CubeType, move: string): CubeType {
  const face = move[0]
  const direction = move.length > 1 ? move[1] : ''
  const times = direction === '2' ? 2 : 1

  for (let i = 0; i < times; i++) {
    switch (face) {
      case 'U':
        cube = rotateUp(cube, direction !== "'")
        break
      case 'D':
        cube = rotateDown(cube, direction !== "'")
        break
      case 'F':
        cube = rotateFront(cube, direction !== "'")
        break
      case 'B':
        cube = rotateBack(cube, direction !== "'")
        break
      case 'L':
        cube = rotateLeft(cube, direction !== "'")
        break
      case 'R':
        cube = rotateRight(cube, direction !== "'")
        break
    }
  }

  return cube
}

function rotateUp(cube: CubeType, clockwise: boolean): CubeType {
  const newCube = JSON.parse(JSON.stringify(cube))
  newCube[0] = rotateFace(newCube[0], clockwise)

  const temp = newCube[2][0].slice()

  if (clockwise) {
    newCube[2][0] = newCube[5][0]
    newCube[5][0] = newCube[3][0]
    newCube[3][0] = newCube[4][0]
    newCube[4][0] = temp
  } else {
    newCube[2][0] = newCube[4][0]
    newCube[4][0] = newCube[3][0]
    newCube[3][0] = newCube[5][0]
    newCube[5][0] = temp
  }

  return newCube
}

function rotateDown(cube: CubeType, clockwise: boolean): CubeType {
  const newCube = JSON.parse(JSON.stringify(cube))
  newCube[1] = rotateFace(newCube[1], clockwise)

  const temp = newCube[2][2].slice()

  if (clockwise) {
    newCube[2][2] = newCube[4][2]
    newCube[4][2] = newCube[3][2]
    newCube[3][2] = newCube[5][2]
    newCube[5][2] = temp
  } else {
    newCube[2][2] = newCube[5][2]
    newCube[5][2] = newCube[3][2]
    newCube[3][2] = newCube[4][2]
    newCube[4][2] = temp.reverse()
  }

  return newCube
}

function rotateFront(cube: CubeType, clockwise: boolean): CubeType {
  const newCube = JSON.parse(JSON.stringify(cube))
  newCube[2] = rotateFace(newCube[2], clockwise)

  const temp = [newCube[0][2][0], newCube[0][2][1], newCube[0][2][2]]

  if (clockwise) {
    [newCube[0][2][0], newCube[0][2][1], newCube[0][2][2]] = [
      newCube[4][2][2],
      newCube[4][1][2],
      newCube[4][0][2],
    ]
    ;[newCube[4][2][2], newCube[4][1][2], newCube[4][0][2]] = [
      newCube[1][0][2],
      newCube[1][0][1],
      newCube[1][0][0],
    ]
    ;[newCube[1][0][2], newCube[1][0][1], newCube[1][0][0]] = [
      newCube[5][0][0],
      newCube[5][1][0],
      newCube[5][2][0],
    ]
    ;[newCube[5][0][0], newCube[5][1][0], newCube[5][2][0]] = temp
  } else {
    [newCube[0][2][0], newCube[0][2][1], newCube[0][2][2]] = [
      newCube[5][0][0],
      newCube[5][1][0],
      newCube[5][2][0],
    ].reverse()
    ;[newCube[5][0][0], newCube[5][1][0], newCube[5][2][0]] = [
      newCube[1][0][2],
      newCube[1][0][1],
      newCube[1][0][0],
    ]
    ;[newCube[1][0][2], newCube[1][0][1], newCube[1][0][0]] = [
      newCube[4][2][2],
      newCube[4][1][2],
      newCube[4][0][2],
    ].reverse()
    ;[newCube[4][2][2], newCube[4][1][2], newCube[4][0][2]] = temp
  }

  return newCube
}

function rotateBack(cube: CubeType, clockwise: boolean): CubeType {
  const newCube = JSON.parse(JSON.stringify(cube))
  newCube[3] = rotateFace(newCube[3], clockwise)

  const temp = [newCube[0][0][2], newCube[0][0][1], newCube[0][0][0]]

  if (clockwise) {
    [newCube[0][0][2], newCube[0][0][1], newCube[0][0][0]] = [
      newCube[5][2][2],
      newCube[5][1][2],
      newCube[5][0][2],
    ]
    ;[newCube[5][2][2], newCube[5][1][2], newCube[5][0][2]] = [
      newCube[1][2][0],
      newCube[1][2][1],
      newCube[1][2][2],
    ]
    ;[newCube[1][2][0], newCube[1][2][1], newCube[1][2][2]] = [
      newCube[4][0][0],
      newCube[4][1][0],
      newCube[4][2][0],
    ]
    ;[newCube[4][0][0], newCube[4][1][0], newCube[4][2][0]] = temp
  } else {
    [newCube[0][0][2], newCube[0][0][1], newCube[0][0][0]] = [
      newCube[4][0][0],
      newCube[4][1][0],
      newCube[4][2][0],
    ]
    ;[newCube[4][0][0], newCube[4][1][0], newCube[4][2][0]] = [
      newCube[1][2][0],
      newCube[1][2][1],
      newCube[1][2][2],
    ]
    ;[newCube[1][2][0], newCube[1][2][1], newCube[1][2][2]] = [
      newCube[5][2][2],
      newCube[5][1][2],
      newCube[5][0][2],
    ]
    ;[newCube[5][2][2], newCube[5][1][2], newCube[5][0][2]] = temp
  }

  return newCube
}

function rotateLeft(cube: CubeType, clockwise: boolean): CubeType {
  const newCube = JSON.parse(JSON.stringify(cube))
  newCube[4] = rotateFace(newCube[4], clockwise)

  const temp = [newCube[0][0][0], newCube[0][1][0], newCube[0][2][0]]

  if (clockwise) {
    [newCube[0][0][0], newCube[0][1][0], newCube[0][2][0]] = [
      newCube[3][2][2],
      newCube[3][1][2],
      newCube[3][0][2],
    ]
    ;[newCube[3][2][2], newCube[3][1][2], newCube[3][0][2]] = [
      newCube[1][2][0],
      newCube[1][1][0],
      newCube[1][0][0],
    ].reverse()
    ;[newCube[1][2][0], newCube[1][1][0], newCube[1][0][0]] = [
      newCube[2][0][0],
      newCube[2][1][0],
      newCube[2][2][0],
    ].reverse()
    ;[newCube[2][0][0], newCube[2][1][0], newCube[2][2][0]] = temp
  } else {
    [newCube[0][0][0], newCube[0][1][0], newCube[0][2][0]] = [
      newCube[2][0][0],
      newCube[2][1][0],
      newCube[2][2][0],
    ]
    ;[newCube[2][0][0], newCube[2][1][0], newCube[2][2][0]] = [
      newCube[1][2][0],
      newCube[1][1][0],
      newCube[1][0][0],
    ].reverse()
    ;[newCube[1][2][0], newCube[1][1][0], newCube[1][0][0]] = [
      newCube[3][2][2],
      newCube[3][1][2],
      newCube[3][0][2],
    ].reverse()
    ;[newCube[3][2][2], newCube[3][1][2], newCube[3][0][2]] = temp
  }

  return newCube
}

function rotateRight(cube: CubeType, clockwise: boolean): CubeType {
  const newCube = JSON.parse(JSON.stringify(cube))
  newCube[5] = rotateFace(newCube[5], clockwise)

  const temp = [newCube[0][0][2], newCube[0][1][2], newCube[0][2][2]]

  if (clockwise) {
    [newCube[0][0][2], newCube[0][1][2], newCube[0][2][2]] = [
      newCube[2][0][2],
      newCube[2][1][2],
      newCube[2][2][2],
    ]
    ;[newCube[2][0][2], newCube[2][1][2], newCube[2][2][2]] = [
      newCube[1][2][2],
      newCube[1][1][2],
      newCube[1][0][2],
    ].reverse()
    ;[newCube[1][2][2], newCube[1][1][2], newCube[1][0][2]] = [
      newCube[3][2][0],
      newCube[3][1][0],
      newCube[3][0][0],
    ].reverse()
    ;[newCube[3][2][0], newCube[3][1][0], newCube[3][0][0]] = temp
  } else {
    [newCube[0][0][2], newCube[0][1][2], newCube[0][2][2]] = [
      newCube[3][2][0],
      newCube[3][1][0],
      newCube[3][0][0],
    ].reverse()
    ;[newCube[3][2][0], newCube[3][1][0], newCube[3][0][0]] = [
      newCube[1][2][2],
      newCube[1][1][2],
      newCube[1][0][2],
    ].reverse()
    ;[newCube[1][2][2], newCube[1][1][2], newCube[1][0][2]] = [
      newCube[2][0][2],
      newCube[2][1][2],
      newCube[2][2][2],
    ]
    ;[newCube[2][0][2], newCube[2][1][2], newCube[2][2][2]] = temp
  }

  return newCube
}

function rotateFace(face: FaceType, clockwise: boolean): FaceType {
  const newFace = JSON.parse(JSON.stringify(face))
  if (clockwise) {
    newFace[0][0] = face[2][0]
    newFace[0][1] = face[1][0]
    newFace[0][2] = face[0][0]
    newFace[1][0] = face[2][1]
    newFace[1][2] = face[0][1]
    newFace[2][0] = face[2][2]
    newFace[2][1] = face[1][2]
    newFace[2][2] = face[0][2]
  } else {
    newFace[0][0] = face[0][2]
    newFace[0][1] = face[1][2]
    newFace[0][2] = face[2][2]
    newFace[1][0] = face[0][1]
    newFace[1][2] = face[2][1]
    newFace[2][0] = face[0][0]
    newFace[2][1] = face[1][0]
    newFace[2][2] = face[2][0]
  }
  return newFace
}
