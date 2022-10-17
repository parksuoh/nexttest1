import { useEffect, useState } from "react"
import axios from 'axios'

const Like = ({id, info}) => {
    const [likes, setLikes] = useState(0)
    const [likeInclude, setLikeInclude] = useState(false)

    const [disLikes, setDisLikes] = useState(0)
    const [disLikeInclude, setDisLikeInclude] = useState(false)

    const getLike = async() => {
        try {
            const res = info ?
                await axios.post('http://localhost:4000/api/board/get-likes/', {id, uid: info.uid}) :
                await axios.post('http://localhost:4000/api/board/get-likes-noinfo/', {id}) 
    
            if(res.data.success === false) {
                return;
            } 
            setLikes(res.data.count)
            setLikeInclude(res.data.include)
        
            } catch (e) {
              console.log(e)
            }   
    }

    const getDisLike = async() => {
        try {
            const res = info ? 
                await axios.post('http://localhost:4000/api/board/get-dislikes/', {id, uid: info.uid}) :
                await axios.post('http://localhost:4000/api/board/get-dislikes-noinfo/', {id}) 
    
            if(res.data.success === false) {
                return;
            } 

            setDisLikes(res.data.count)
            setDisLikeInclude(res.data.include)
        
            } catch (e) {
              console.log(e)
            }   
    }

    

    useEffect(() => {
        if(info){
            getLike()
            getDisLike()
        }

    }, [id, info])

    const toggleLike = async() => {
        try {
            const res = await axios.post('http://localhost:4000/api/board/toggle-like/', {id, uid: info.uid})
    
            if(res.data.success === false) {
                return;
            } 

            getLike()
            getDisLike()
        
            } catch (e) {
              console.log(e)
            }   
    }

    const toggleDisLike = async() => {
        try {
            const res = await axios.post('http://localhost:4000/api/board/toggle-dislike/', {id, uid: info.uid})
    
            if(res.data.success === false) {
                return;
            } 
            getLike()
            getDisLike()
        
            } catch (e) {
              console.log(e)
            }   
    }


  return (
    <div
        className="border border-indigo-600 flex justify-around"
    >
        <div
            onClick={() => {
                if(info) {
                    toggleLike()
                }
            }}
            className="border border-slate-500"
        >
            <button>
                {likeInclude ? '좋아요 ㅇㅇ' : '좋아요 ㄴㄴ'}
            </button>
            <h4>{likes}</h4>
        </div>
        <div
            onClick={() => {
                if(info){
                    toggleDisLike()
                }
            }}
            className="border border-slate-500"
        >
            <button>
                {disLikeInclude ? '싫어요 ㅇㅇ' : '싫어요 ㄴㄴ'}
            </button>
            <h4>{disLikes}</h4>
        </div>

    </div>
  )
}

export default Like
