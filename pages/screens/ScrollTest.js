import {useEffect, useState} from 'react';
import TopHeader from '../../components/TopHeader';
// import Image from "next/image";
import { useRef } from 'react';
import axios from 'axios';


const ScrollTest = () => {
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



    const [windowHeight, setWindowHeight] = useState(0);
    const [yOffset, setYOffset] = useState(0);
    const [currentScene, setCurrentScene] = useState(0);
    const [currentScroll, setCurrentScroll]= useState(0);
    const [sceneInfo, setSceneInfo] = useState(
        [
            {
                heightNum: 2, // 브라우저 높이의 5배 scrollHeight 세팅
                scrollHeight: 0,
            },
            {
                heightNum: 3, // 브라우저 높이의 5배 scrollHeight 세팅
                scrollHeight: 0,
            },
            {
                heightNum: 4, // 브라우저 높이의 5배 scrollHeight 세팅
                scrollHeight: 0,
            },
            {
                heightNum: 5, // 브라우저 높이의 5배 scrollHeight 세팅
                scrollHeight: 0,
            },
        ]
    )
    let prevHeight = 0

    const canvasRef = useRef(null)
    let totalImagesCount = 960;
    const [imgs, setImgs] = useState([])

    useEffect(() => {
        setWindowHeight(window.innerHeight)
        const handleWindowResize = () => {
            setWindowHeight(window.innerHeight);
        }
    
        window.addEventListener('resize', handleWindowResize);
        window.addEventListener('scroll', () => {
            setYOffset(window.pageYOffset)

        });
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        sceneInfo.forEach((itm, idx) => {
            let arr = [...sceneInfo]
            arr[idx].scrollHeight = itm.heightNum * windowHeight
            setSceneInfo(arr)
        })
    }, [windowHeight])

    useEffect(() => {
        prevHeight = 0
        for(let i = 0 ; i < currentScene; i++) {
            prevHeight += sceneInfo[i].scrollHeight
        }

        if (yOffset > prevHeight + sceneInfo[currentScene].scrollHeight){
            setCurrentScene(currentScene + 1)
        }

        if (yOffset < prevHeight){
            if (currentScene === 0) return
            setCurrentScene(currentScene - 1)
        }

        setCurrentScroll((yOffset - prevHeight) / sceneInfo[currentScene].scrollHeight)
    }, [yOffset])

    
    const setImages = () => {
        let videoImages =[]

        for (let i = 0; i < totalImagesCount; i++) {
            let imgElem = new Image();
            imgElem.src = `/002/IMG_${7027 + i}.JPG`;
            videoImages.push(imgElem);
        }

        setImgs(videoImages)

    }

    useEffect(() => { 
        setImages() 

    }, [])


    
    useEffect(() => {
        if (imgs.length > 0){
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
    
            const context = canvas.getContext("2d")
    
            let currentFrame = Math.round(currentScroll * 1000)

            if (imgs[currentFrame]){
                context.drawImage(imgs[currentFrame], 0, 0, window.innerWidth, window.innerHeight);
            }

        }
        
    }, [currentScroll])

  return (
    <div>
        <TopHeader info={info} setInfo={setInfo} />
        {sceneInfo.map((itm, idx) => (
            <div
                key={idx}
                className={`w-screen border-2 border-indigo-600 items-center`}
                style={{height: `${itm.scrollHeight.toString()}px`}}
            >

                <h1>{itm.scrollHeight.toString()}</h1>

            </div>
        ))}
        <div style={{position: 'fixed', top: 50, left: 0}}> 
            <canvas ref={canvasRef}/>
        </div>
        <div style={{position: 'fixed', top: 50, left: 0}}> 
            <h1 style={{zIndex : 30}}>현재 스크롤: {yOffset}</h1>
            <h1 style={{zIndex : 30}}>현재 씬: {currentScene}</h1>
            <h1 style={{zIndex : 30}}>현재 스크롤 씬 비율:{currentScroll}</h1>
            <h1 style={{zIndex : 30}}>현재 스크롤 씬 비율2:{Math.round(currentScroll * 1000)}</h1>
        </div>
    </div>
  )
}

export default ScrollTest
