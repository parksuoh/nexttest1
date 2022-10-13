import TopHeader from '../../../../components/TopHeader'
import { Fragment, useEffect, useState } from "react"
import axios from 'axios'
import Link from "next/link";
import { useRouter } from 'next/router';
import AutoSizeText from '../../../../components/AutoSizeText';
import ReactPlayer from 'react-player';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Like from '../../../../components/Like';
import Comments from '../../../../components/Comments';

const read = () => {
    const router = useRouter();
    const { id } = router.query
    const [info, setInfo] = useState()

    const [title, setTitle] = useState('')

    const [menuId, setMenuId] = useState(0)

    const [uid, setUid] = useState('')
    
    const [text, setText] = useState([''])
    const [photo, setPhoto] = useState([])
    const [video, setVideo] = useState([])
    const [youtube, setYoutube] = useState([])
    const [twitter, setTwitter] = useState([])

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

    const getBoard = async() => {
        try {
        const res = await axios.post('http://localhost:4000/api/board/get-read-board/', {id})

        if(res.data.success === false) {
            return;
        } 
        setTitle(res.data.boardTitle)
        setText(res.data.boardCont.text)
        setPhoto(res.data.boardCont.photo)
        setVideo(res.data.boardCont.video)
        setYoutube(res.data.boardCont.youtube)
        setTwitter(res.data.boardCont.twitter)

        setUid(res.data.uid)

        setMenuId(res.data.menuCd)
    
        } catch (e) {
          console.log(e)
        }      
    };

    useEffect(() => {
        getAuth()
        if(id){
            getBoard()
        }
    }, [id])


  return (
    <div className='flex flex-col w-full min-h-screen'>
        <TopHeader info={info} setInfo={setInfo} />
        글 읽기 {id}

        {(info && uid === info.uid) && (
            <div
                onClick={() => router.push(`/screens/board/update/${id}/`)}
            >
                글수정
            </div>
        )}


        <div>{title}</div>
        {text.map((itm, idx) => (
            <div
                key={idx}
            >
            <AutoSizeText 
                value={itm}
                onChange={(e) => {
                let arr = [...text]
                arr[idx] = e.target.value
                setText(arr)
                }}
                onKeyDown={(e) => onContextKey(e, idx)}
                readOnly={true}
            />
            {photo[idx] && photo[idx] !== '0' && (
                <img className='w-48' src={`http://localhost:4000/uploads/${menuId}/${photo[idx]}`} alt="preview-img" />
            )}
            {video[idx] && video[idx] !== '0' && (
                <video
                    className='w-48'
                    width="100%"
                    controls
                    src={`http://localhost:4000/uploads/${menuId}/${video[idx]}`}
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
        {id  && (
            <Like
                id={id}
                info={info}
            />
        )}

        <Comments
            id={id}
            info={info}
        />


    </div>
  )
}

export default read
