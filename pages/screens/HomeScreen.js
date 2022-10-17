import TopHeader from '../../components/TopHeader'
import { useEffect, useState } from "react"
import axios from 'axios'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HomeScreen = () => {
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
 

  return (
      <div className='flex flex-col w-full min-h-screen'>
        <TopHeader info={info} setInfo={setInfo} />
        <div>홈</div>
        <div>유저번호: {info && info.uid}</div>
        <div>이메일: {info && info.email}</div>
        <div>닉네임: {info && info.nick}</div>
        <div>이름: {info && info.name}</div>
        <div>레벨: {info && info.level}</div>
        {/* <div className='w-28 h-28'>
          <Skeleton
              circle
              height="100%"
              containerClassName="avatar-skeleton"
          />
        </div>
        <div className='w-28 h-10'>
          <Skeleton width={110} height={30} /> 
        </div>
        <div className='w-28 h-20'>
          <Skeleton count={3} /> 
        </div> */}
      </div>
  )
}

export default HomeScreen
