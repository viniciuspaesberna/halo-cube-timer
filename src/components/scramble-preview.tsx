/* eslint-disable */
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { Cube } from './three-d/cube'
import { generateCubeFaceSVG } from '@/utils/generate-cube-fase-svg'
import { ColorFaces, applyScramble } from '@/utils/scramble-cube'

const cubeState = applyScramble([
  "R",
  "F2",
  "R",
  "U",
  "B2",
  "U'",
  "L",
  "U2",
  "L",
  "B'",
  "D",
  "F2",
  "L'",
  "D",
  "R",
  "B",
  "D2",
  "B",
  "L2",
  "F2"
])


export const ScramblePreview = () => {

  return (
    <div className="absolute z-10 bg-zinc-800/50 rounded-br-full shadow-xl h-80 w-80">
      <Canvas className=''>
        <ambientLight intensity={2} />
        <directionalLight position={[2, 1, 1]}/>

        <Cube />
        

        <OrbitControls enableZoom={false} />
      </Canvas>

      <div className='flex gap-2'>
        <div>
          <div className='flex items-center justify-center size-36 mt-36' dangerouslySetInnerHTML={{ __html: generateCubeFaceSVG({ face: cubeState[ColorFaces.orange] }) }} />
        </div>
        <div>
          <div className='rotate-180 flex items-center justify-center size-36 my-2' dangerouslySetInnerHTML={{ __html: generateCubeFaceSVG({ face: cubeState[ColorFaces.blue] }) }} />
          <div className='flex items-center justify-center size-36 my-2' dangerouslySetInnerHTML={{ __html: generateCubeFaceSVG({ face: cubeState[ColorFaces.white] }) }} />
          <div className='flex items-center justify-center size-36 my-2' dangerouslySetInnerHTML={{ __html: generateCubeFaceSVG({ face: cubeState[ColorFaces.green] }) }} />
          <div className='flex items-center justify-center size-36 my-2' dangerouslySetInnerHTML={{ __html: generateCubeFaceSVG({ face: cubeState[ColorFaces.yellow] }) }} />
        </div>
        <div>
          <div className='flex items-center justify-center size-36 mt-36' dangerouslySetInnerHTML={{ __html: generateCubeFaceSVG({ face: cubeState[ColorFaces.red] }) }} />
        </div>
      </div>


    </div>
  )
}

