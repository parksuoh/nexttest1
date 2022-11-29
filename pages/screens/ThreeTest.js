import { useEffect, useState, Suspense } from "react"
import TopHeader from "../../components/TopHeader";
import axios from 'axios'
import styles from "./ThreeTest.module.css";

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, OrbitControls, Scroll, ScrollControls, Sphere, useScroll } from "@react-three/drei"
import Box from "../../components/Box";
import { useRef } from "react";
import gsap from "gsap";

const ThreeTest = () => {
    const [info, setInfo] = useState()
    const { width, height } = useWindowDimensions();

    const getAuth = async() => {
        try {
          const res = await axios.get('http://localhost:4000/api/user/auth/', { withCredentials: true })
    
          if(res.data.success === false) {
              return;
          } 
          setInfo(res.data)
    
        } catch (e) {
          console.log(e)
        }      
      };
      
      useEffect(() => {
        getAuth()
      }, [])


  return (
    <div>
      <TopHeader info={info} setInfo={setInfo} />
      <div className="h-[1000px] bg-green-50">

        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} intensity={1} />
          <Suspense fallback={null} >
            <Box />
          </Suspense>
        </Canvas>

      </div>
      <div className="h-[1000px] bg-blue-50">

        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} intensity={1} />
          <Suspense fallback={null} >
            <Sphere />
          </Suspense>
        </Canvas>

      </div>

      <div className="h-[1000px] bg-blue-50">

      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{
          aspect: width / height,
          fov: 100,
          near: 0.1,
          far: 1000,
          position: [0, 1, 6],
        }}
      >
        <color attach="background" args={["pink"]} />
        <fog attach={"fog"} args={["black", 0, 7]} />
        <directionalLight color={"red"} position={[0, 0, 1]} />
        {[1,1,1,1,1,1].map((item) => <MyBox /> )}
      </Canvas>

      </div>




      <div className="h-screen">
        <div className={styles.scltest}>
          <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
              <ScrollControls
                damping={3}
                pages={2}
                horizontal={false}
                infinite={false}
              >
                <Scroll>
                  <Images />
                </Scroll>
                <Scroll html>
                  <h1 className={styles.scltestH} style={{ position: "absolute", top: "60vh", left: "1.5em" }}>
                    Be
                  </h1>
                  <h1 className={styles.scltestH} style={{ position: "absolute", top: "140vh", left: "40vw" }}>
                    Creative
                  </h1>
                </Scroll>
              </ScrollControls>
            </Suspense>
          </Canvas>
        </div>
      </div>


    </div>
  )
}


function MyBox() {
  const box = useRef();
  useEffect(() => {
    gsap.to(box.current.position, {
      duration: 1,
      y: 3,
    });
  }, [box]);
  useFrame((state, delta) => {
    gsap.to(box.current.rotation, {
      y: state.clock.elapsedTime,
    });
  });
  return (
    <mesh
      ref={box}
      position={[Math.random() * 5 - 2.5, 0, Math.random() * 5 - 2.5]}
    >
      <meshStandardMaterial attach="material" color="red" />
      <boxGeometry attach="geometry" />
    </mesh>
  );
}


function Images() {
  const { width, height } = useThree((state) => state.viewport);
  const data = useScroll();
  const group = useRef();
  useFrame(() => {
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[2].material.zoom =
      1 + data.range(1.15 / 3, 1 / 3) / 3;
    group.current.children[3].material.zoom =
      1 + data.range(1.15 / 3, 1 / 3) / 3;
  });

  return (
    <group ref={group}>
      <Image url="/002/IMG_7275.JPG" scale={[5, height, 1]} position={[-1, 0, 1]} />
      <Image url="/002/IMG_7575.JPG" scale={3} position={[2, 0, 1]} />
      <Image
        url="/002/IMG_7816.JPG"
        scale={[1, 3.5, 1]}
        position={[-3, -height, 2]}
      />
      <Image
        url="/002/IMG_7900.JPG"
        scale={[1, 2.7, 1]}
        position={[-1.4, -height - 0.7, 1]}
      />
      <Image
        url="/002/IMG_7986.JPG"
        scale={[1.4, 2, 1]}
        position={[1.3, -height - 0.3, 3.2]}
      />
    </group>
  );
}



function getWindowDimensions() {
  let width;
  let height;

  useEffect(() => {
    width = window.innerWidth
    height = window.innerHeight
  }, [])
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default ThreeTest
