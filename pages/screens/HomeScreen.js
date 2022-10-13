import TopHeader from '../../components/TopHeader'
import { useEffect, useState } from "react"
import axios from 'axios'

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
      </div>
  )
}

export default HomeScreen
