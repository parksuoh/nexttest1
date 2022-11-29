import TopHeader from "../../components/TopHeader";
import axios from 'axios'
import * as THREE from "three";
import { useState, useEffect } from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'


const ThreeTest2 = () => {
    const [info, setInfo] = useState()

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

    // useEffect(() => {
    //   const scene = new THREE.Scene();

    //   const camera = new THREE.PerspectiveCamera(
    //     50,
    //     window.innerWidth / window.innerHeight,
    //     1,
    //     1000
    //   )
    //   camera.position.z = 96;

    //   const canvas = document.getElementById('myThreeJsCanvas');
    //   const renderer = new THREE.WebGLRenderer({
    //     canvas,
    //     antialias: true,
    //   })
    //   renderer.setSize(window.innerWidth, window.innerHeight)
    //   document.body.appendChild(renderer.domElement)

    //   const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    //   ambientLight.castShadow = true
    //   scene.add(ambientLight)

    //   const soptLight = new THREE.SpotLight(0xffffff, 1)
    //   soptLight.castShadow = true;
    //   soptLight.position.set(0, 64, 32)
    //   scene.add(soptLight)


    //   const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    //   const boxMaterial = new THREE.MeshNormalMaterial()
    //   const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    //   scene.add(boxMesh)

    //   const controls = new OrbitControls(camera, renderer.domElement)
      
    //   const stats = Stats()
    //   document.body.appendChild(stats.dom)

    //   const animate = () => {
    //     // boxMesh.rotation.x += 0.01;
    //     // boxMesh.rotation.y += 0.01;
    //     stats.update()
    //     controls.update()
    //     renderer.render(scene, camera)
    //     window.requestAnimationFrame(animate)
    //   }

    //   // animate()

    // }, [])

  return (
    <div>
        <TopHeader info={info} setInfo={setInfo} />
          {/* <canvas id="myThreeJsCanvas" /> */}
    </div>
  )
}


  


export default ThreeTest2
