import { Sphere, MeshDistortMaterial } from "@react-three/drei"

const AnimatedSphere = () => {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
        <MeshDistortMaterial 
            color="#DC143"
            attach="material"
            distort={0.3}
            apeed={1.5}
            roughness={0}
        />
    </Sphere>
  )
}

export default AnimatedSphere
