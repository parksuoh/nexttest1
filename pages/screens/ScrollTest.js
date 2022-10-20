import {useEffect, useState} from 'react';



const ScrollTest = () => {
    const [windowHeight, setWindowHeight] = useState(0);
    const [yOffset, setYOffset] = useState(0);
    const [currentScene, setCurrentScene] = useState(0);
    const [currentScroll, setCurrentScroll]= useState(0);
    const [sceneInfo, setSceneInfo] = useState(
        [
            {
                heightNum: 5, // 브라우저 높이의 5배 scrollHeight 세팅
                scrollHeight: 0,
            },
            {
                heightNum: 5, // 브라우저 높이의 5배 scrollHeight 세팅
                scrollHeight: 0,
            },
            {
                heightNum: 5, // 브라우저 높이의 5배 scrollHeight 세팅
                scrollHeight: 0,
            },
            {
                heightNum: 5, // 브라우저 높이의 5배 scrollHeight 세팅
                scrollHeight: 0,
            },
        ]
    )
    let prevHeight = 0

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

    

  return (
    <div>
        {sceneInfo.map((itm, idx) => (
            <div
                key={idx}
                className={`w-screen h-[${itm.scrollHeight.toString()}px] border-2 border-indigo-600`}
            >
                {itm.scrollHeight.toString()}
                <h1>{yOffset}</h1>
                <h1>{currentScene}</h1>
                <h1>{currentScroll}</h1>
            </div>
        ))}

    </div>
  )
}

export default ScrollTest
