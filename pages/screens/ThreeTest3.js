import TopHeader from "../../components/TopHeader";
import axios from 'axios'
import { useState, useEffect } from "react";
import * as THREE from "three";
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare'
import { FlyControls  } from 'three/examples/jsm/controls/FlyControls'
import Stats from "three/examples/jsm/libs/stats.module";

const ThreeTest3 = () => {
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

      useEffect(() => {
        
        // 씬
        const scene = new THREE.Scene();
        scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
        scene.fog = new THREE.Fog(scene.background, 3500, 15000);

        //카메라
        const camera = new THREE.PerspectiveCamera(
          40,
          window.innerWidth / window.innerHeight,
          1,
          15000
        )
        camera.position.z = 250;

        // 켄버스
        const canvas = document.getElementById('myThreeJsCanvas2');
        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
        })
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.outputEncoding = THREE.sRGBEncoding;
        document.body.appendChild(renderer.domElement)


        // 빛
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.03);
        dirLight.position.set(0, -1, 0).normalize();
        dirLight.color.setHSL(0.1, 0.7, 0.5);
        scene.add(dirLight);


        // 도형 (질감, 텍스쳐)
        const size = 250;

        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          specular: 0xffffff,
          shininess: 50,
        });


        for (let i = 0; i < 2500; i++) {
          const mesh = new THREE.Mesh(geometry, material);
      
          mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
          mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
          mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);
      
          mesh.rotation.x = Math.random() * Math.PI;
          mesh.rotation.y = Math.random() * Math.PI;
          mesh.rotation.z = Math.random() * Math.PI;
      
          mesh.matrixAutoUpdate = false;
          mesh.updateMatrix(); 
      
          scene.add(mesh);
        }

        const textureLoader = new THREE.TextureLoader();

        const textureFlare = textureLoader.load("/LensFlare.png");
        
        const addLight = (h, s, l, x, y, z) => {
          const light = new THREE.PointLight(0xffffff, 1.5, 2000);
          light.color.setHSL(h, s, l);
          light.position.set(x, y, z);
          scene.add(light);
      
          const lensflare = new Lensflare();
          lensflare.addElement(
            new LensflareElement(textureFlare, 700, 0, light.color)
          );

          light.add(lensflare);
        }

        addLight(0.08, 0.3, 0.9, 0, 0, -1000);


        // 컨트롤 
        const controls = new FlyControls(camera, renderer.domElement);

        controls.movementSpeed = 2500;
        controls.domElement = canvas;
        controls.rollSpeed = Math.PI / 20;
        controls.autoForward = false;
        controls.dragToLook = false;

        // 스테이트
        const stats = new Stats();
        document.body.appendChild(stats.dom)


        // 반응형
        const onWindowResize = () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
        
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
        }

        window.addEventListener("resize", onWindowResize);

        const clock = new THREE.Clock();

        // 실행
        const animate = () => {
          stats.update();
          const delta = clock.getDelta();
          controls.update(delta);
          renderer.render(scene, camera);
          window.requestAnimationFrame(animate);
        }

        animate()
      }, [])

  return (
    <div>
        <TopHeader info={info} setInfo={setInfo} />
        <canvas id="myThreeJsCanvas2" />
      
    </div>
  )
}




export default ThreeTest3
