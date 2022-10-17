import TopHeader from '../../../../components/TopHeader'
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import axios from 'axios'
import ReactPlayer from 'react-player/youtube'
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useRouter } from 'next/router';
import AutoSizeText from '../../../../components/AutoSizeText';

const write = () => {
    const router = useRouter();
    const { id } = router.query

    const [info, setInfo] = useState()
    const [title, setTitle] = useState('')
    
    const [text, setText] = useState([''])
    const [photo, setPhoto] = useState([])
    const [video, setVideo] = useState([])
    const [youtube, setYoutube] = useState([])
    const [twitter, setTwitter] = useState([])

    const [imageFiles, setImageFiles] = useState([])
    const [videoFiles, setVideoFiles] = useState([])

    const [youtubeUrl, setYoutubeUrl] = useState('')
    const [twitterUrl, setTwitterUrl] = useState('')

    const [contextSel, setContextSel] = useState(0)

    const photoRef = useRef();
    const videoRef = useRef();

    const onSubmit = async() => {
      let formData = new FormData()

      formData.append("id", id)
      formData.append("title", title)
      formData.append("uid", info.uid)

      const photoNumArr = photo.reduce((result, itm, idx) => {
        if(itm !== '0'){
          return [...result, idx]
        }
        return result
      }, [])
      
      const videoNumArr = video.reduce((result, itm, idx) => {
        if(itm !== '0'){
          return [...result, idx]
        }
        return result
      }, [])

      text.forEach((itm) => {
        formData.append("text", itm)
      })
      photoNumArr.forEach((itm) => {
        formData.append("photo", itm)
      })
      videoNumArr.forEach((itm) => {
        formData.append("video", itm)
      })
      youtube.forEach((itm) => {
        formData.append("youtube", itm)
      })
      twitter.forEach((itm) => {
        formData.append("twitter", itm)
      })
      imageFiles.forEach((itm) => {
        formData.append("imageFiles", itm)
      })
      videoFiles.forEach((itm) => {
        formData.append("videoFiles", itm)
      })
      
      try {
        const res = await axios.post(
            'http://localhost:4000/api/board/write-board/',
            formData, 
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
        )
    
        if(res.data.success === false) {
            return;
        } 
        
        router.push(`/screens/board/list/${id}/`)

    } catch (e) {
        console.log(e)
    }      

    }


    const getAuth = useCallback(async() => {
      try {
        const res = await axios.get('http://localhost:4000/api/user/auth/', { withCredentials: true })
  
        if(res.data.success === false) {
            return;
        } 
        setInfo(res.data)
  
      } catch (e) {
        console.log(e)
      }      
    }, [])
    
    useEffect(() => {
      getAuth()
    }, [])

    const handleImg = (event) => {
      if (!event.target.files[0]) return;

      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          let textArr = [...text]
          let photoArr = [...photo]
          let videoArr = [...video]
          let youtubeArr = [...youtube]
          let twitterArr = [...twitter]

          let photoFileArr = [...imageFiles]
          let videoFileArr = [...videoFiles]

          textArr.splice(contextSel + 1, 0, '')
          photoArr.splice(contextSel, 0, reader.result)
          videoArr.splice(contextSel, 0, '0')
          youtubeArr.splice(contextSel, 0, '0')
          twitterArr.splice(contextSel, 0, '0')

          photoFileArr.splice(contextSel, 0, file)
          videoFileArr.splice(contextSel, 0, '')

          setText(textArr)
          setPhoto(photoArr)
          setVideo(videoArr)
          setYoutube(youtubeArr)
          setTwitter(twitterArr)

          setImageFiles(photoFileArr)
          setVideoFiles(videoFileArr)

          photoRef.current.value = ""

          resolve();
        };
      });
    };

    const handleVdo = (event) => {
      if (!event.target.files[0]) return;

      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          let textArr = [...text]
          let photoArr = [...photo]
          let videoArr = [...video]
          let youtubeArr = [...youtube]
          let twitterArr = [...twitter]

          let photoFileArr = [...imageFiles]
          let videoFileArr = [...videoFiles]

          textArr.splice(contextSel + 1, 0, '')
          photoArr.splice(contextSel, 0, '0')
          videoArr.splice(contextSel, 0, reader.result)
          youtubeArr.splice(contextSel, 0, '0')
          twitterArr.splice(contextSel, 0, '0')

          photoFileArr.splice(contextSel, 0, file)
          videoFileArr.splice(contextSel, 0, '')

          setText(textArr)
          setPhoto(photoArr)
          setVideo(videoArr)
          setYoutube(youtubeArr)
          setTwitter(twitterArr)

          setImageFiles(photoFileArr)
          setVideoFiles(videoFileArr)

          videoRef.current.value = ""

          resolve();
        };
      });
    };

    const handleYoutube = () => {
      if(youtubeUrl.length > 0){
        let textArr = [...text]
        let photoArr = [...photo]
        let videoArr = [...video]
        let youtubeArr = [...youtube]
        let twitterArr = [...twitter]

        let photoFileArr = [...imageFiles]
        let videoFileArr = [...videoFiles]

        textArr.splice(contextSel + 1, 0, '')
        photoArr.splice(contextSel, 0, '0')
        videoArr.splice(contextSel, 0, '0')
        youtubeArr.splice(contextSel, 0, youtubeUrl)
        twitterArr.splice(contextSel, 0, '0')

        photoFileArr.splice(contextSel, 0, '')
        videoFileArr.splice(contextSel, 0, '')
  
        setText(textArr)
        setPhoto(photoArr)
        setVideo(videoArr)
        setYoutube(youtubeArr)
        setTwitter(twitterArr)
  
        setImageFiles(photoFileArr)
        setVideoFiles(videoFileArr)
  
        setYoutubeUrl('')
      }
    }

    const handleTwitter = () => {
      if(twitterUrl.length > 0){
        let tweetId = twitterUrl.split('status/')[1].substr(0,19)

        let textArr = [...text]
        let photoArr = [...photo]
        let videoArr = [...video]
        let youtubeArr = [...youtube]
        let twitterArr = [...twitter]

        let photoFileArr = [...imageFiles]
        let videoFileArr = [...videoFiles]

        textArr.splice(contextSel + 1, 0, '')
        photoArr.splice(contextSel, 0, '0')
        videoArr.splice(contextSel, 0, '0')
        youtubeArr.splice(contextSel, 0, '0')
        twitterArr.splice(contextSel, 0, tweetId)

        photoFileArr.splice(contextSel, 0, '')
        videoFileArr.splice(contextSel, 0, '')
  
        setText(textArr)
        setPhoto(photoArr)
        setVideo(videoArr)
        setYoutube(youtubeArr)
        setTwitter(twitterArr)
  
        setImageFiles(photoFileArr)
        setVideoFiles(videoFileArr)
  
        setTwitterUrl('')
      }
    }

    const onContextKey = (e, idx) => {
      if(e.key === "Backspace" && idx > 0 && text[idx] === '') {
        let textArr = [...text].filter((itm, index) => idx !== index)
        let photoArr = [...photo].filter((itm, index) => idx-1 !== index)
        let videoArr = [...video].filter((itm, index) => idx-1 !== index)
        let youtubeArr = [...youtube].filter((itm, index) => idx-1 !== index)
        let twitterArr = [...twitter].filter((itm, index) => idx-1 !== index)

        let photoFileArr = [...imageFiles].filter((itm, index) => idx-1 !== index)
        let videoFileArr = [...videoFiles].filter((itm, index) => idx-1 !== index)


        setText(textArr)
        setPhoto(photoArr)
        setVideo(videoArr)
        setYoutube(youtubeArr)
        setTwitter(twitterArr)

        setImageFiles(photoFileArr)
        setVideoFiles(videoFileArr)
      }
    }


  return (
    <div className='flex flex-col w-full min-h-screen'>
        <TopHeader info={info} setInfo={setInfo} />
        글쓰기 페이지 {id}
        <div>
            <h5>제목</h5>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="제목"
            />
        </div>

        <div
          className='flex flex-col'
        >
            <button onClick={() => photoRef.current.click()}>사진 추가</button>
            <button onClick={() => videoRef.current.click()}>비디오 추가</button>
            <input
                type="text"
                onChange={(e) => setYoutubeUrl(e.target.value)}
                value={youtubeUrl}
                placeholder="유튜브URL"
            />
            <button
              onClick={() => handleYoutube()}
            >
              유튜브 추가
            </button>
            <input
                type="text"
                onChange={(e) => setTwitterUrl(e.target.value)}
                value={twitterUrl}
                placeholder="트윗url"
            />
            <button
              onClick={() => handleTwitter()}
            >
              트위터 추가
            </button>
            <h5>내용</h5>
            {text.map((itm, idx) => (
              <div
                key={idx}
                onClick={() => setContextSel(idx)}
              >
                <AutoSizeText 
                  value={itm}
                  onChange={(e) => {
                    const input = e.target.value;
                    setText((prevArr) => {
                      return [
                        ...prevArr.slice(0, idx),
                        input,
                        ...prevArr.slice(idx + 1, prevArr.length)
                      ]
                    })
                  }}
                  onKeyDown={(e) => onContextKey(e, idx)}
                  readOnly={false}
                />
                {photo[idx] && photo[idx] !== '0' && (
                  <img className='w-48' src={photo[idx]} alt="preview-img" />
                )}
                {video[idx] && video[idx] !== '0' && (
                  <video
                    className='w-48'
                    width="100%"
                    controls
                    src={video[idx]}
                  />
                )}
                {youtube[idx] && youtube[idx] !== '0' && (
                  <ReactPlayer
                    url={youtube[idx]}
                    controls={true}
                  />
                )}
                {twitter[idx] && twitter[idx] !== '0' && (
                  <TwitterTweetEmbed
                    optins={{width: "900px"}} 
                    tweetId={twitter[idx]}
                  />
                )}
              </div>
            ))}
        </div>

        <button
          onClick={() => onSubmit()}
        >
          게시하기
        </button>

        <input 
          ref={photoRef}
          type="file" 
          onChange={handleImg} 
          className="hidden"
          accept="image/*"
        />
        <input
          ref={videoRef}
          className="hidden"
          type="file"
          onChange={handleVdo}
          accept=".mov,.mp4"
        />
    </div>
  )
}




export default write
