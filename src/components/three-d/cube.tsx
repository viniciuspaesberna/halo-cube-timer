/* eslint-disable */

import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export const Cube = (props: JSX.IntrinsicElements['mesh']) => {
  const mesh = useRef<THREE.Mesh>(null!)

  useFrame((_state, delta) => {
    mesh.current.rotation.x += delta * 0.25
    mesh.current.rotation.y += delta * 0.25
    mesh.current.rotation.z += delta * 0.25
  })

  const white = useLoader(THREE.TextureLoader, './white-face.svg')
  const yellow = useLoader(THREE.TextureLoader, './yellow-face.svg')
  const blue = useLoader(THREE.TextureLoader, './blue-face.svg')
  const green = useLoader(THREE.TextureLoader, './green-face.svg')
  const orange = useLoader(THREE.TextureLoader, './orange-face.svg')
  const red = useLoader(THREE.TextureLoader, './red-face.svg')

  return (
    <mesh
      ref={mesh}
      {...props}
    >
      <boxGeometry args={[3, 3, 3]} />

      <meshStandardMaterial map={white} attach="material-0" />      
      <meshStandardMaterial map={yellow} attach="material-1" />      
      <meshStandardMaterial map={blue} attach="material-2" />      
      <meshStandardMaterial map={green} attach="material-3" />      
      <meshStandardMaterial map={orange} attach="material-4" />      
      <meshStandardMaterial map={red} attach="material-5" />      
    </mesh>
  )
}
