
import { useLoader } from "@react-three/fiber"
import texture from '../public/002/IMG_7236.JPG'
import { TextureLoader } from 'three'

const Box = () => {
    // const colorMap = useLoader(TextureLoader, texture)
    // console.log(TextureLoader)

  return (
    <mesh rotation={[90, 0, 23]}>
      {/* 도형 */}
      <boxBufferGeometry attach="geometry" arg={[3, 3, 3]}  />  
      
      {/* <meshStandardMaterial map={colorMap} /> */}
      {/* 제질 */}
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

export default Box
