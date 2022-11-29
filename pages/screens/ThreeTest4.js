import TopHeader from "../../components/TopHeader";
import axios from 'axios'
import { useState, useEffect } from "react";
import Stats from "three/examples/jsm/libs/stats.module";
import * as THREE from "three";
import GUI from 'lil-gui';


const ThreeTest4 = () => {
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
        getAuth()

        let mouseX = 0 
        let mouseY = 0;

        // 씬
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0x000000, 0.001 );

        // 카메라
        const camera = new THREE.PerspectiveCamera( 
                    55, 
                    window.innerWidth / window.innerHeight, 
                    2, 
                    2000 
                );
        camera.position.z = 1000;


        // 캔버스
        const canvas = document.getElementById('myThreeJsCanvas3');
        const renderer = new THREE.WebGLRenderer(canvas);
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        // renderer.setSize( 200, 200 );
        document.body.appendChild( renderer.domElement );


        //도형
        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        const sprite = new THREE.TextureLoader().load( '/disc.png' );

        for ( let i = 0; i < 10000; i ++ ) {

            const x = 2000 * Math.random() - 1000;
            const y = 2000 * Math.random() - 1000;
            const z = 2000 * Math.random() - 1000;

            vertices.push( x, y, z );

        }

        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        const material = new THREE.PointsMaterial( { size: 35, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
        material.color.setHSL( 1.0, 0.3, 0.7 );

        const particles = new THREE.Points( geometry, material );
        scene.add( particles );




        // 스테이트
        const stats = new Stats();
        document.body.appendChild( stats.dom );

        //GUI
        const gui = new GUI();
        gui.add( material, 'sizeAttenuation' ).onChange(() => {
            material.needsUpdate = true;
        } );
        gui.open();
        

        //컨트롤

        const onPointerMove = ( event ) => {
            let windowHalfX = window.innerWidth / 2;
			let windowHalfY = window.innerHeight / 2;

            if ( event.isPrimary === false ) return;

            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;

        }

        document.body.style.touchAction = 'none';
        document.body.addEventListener( 'pointermove', onPointerMove );

        // 반응형

        const onWindowResize = () => {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        window.addEventListener( 'resize', onWindowResize );


        // 실행
        const animate = () => {

            requestAnimationFrame( animate );

            const time = Date.now() * 0.00005;

				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

				camera.lookAt( scene.position );

				const h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
				// material.color.setHSL( h, 0.5, 0.5 );

				renderer.render( scene, camera );
            stats.update();

        }

        animate()
    }, [])

  return (
    <div>
        <TopHeader info={info} setInfo={setInfo} />
        <canvas id="myThreeJsCanvas3" />
      
    </div>
  )
}

export default ThreeTest4
