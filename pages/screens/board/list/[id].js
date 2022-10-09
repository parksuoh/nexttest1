import TopHeader from '../../../../components/TopHeader'
import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import Link from "next/link";
import { useRouter } from 'next/router';

const list = () => {
    const [info, setInfo] = useState()
    const [list, setList] = useState([])
    const router = useRouter();
    const { id } = router.query

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

    const getList = async() => {
      try {
        const res = await axios.post('http://localhost:4000/api/board/get-board-list/', {id})
  
        if(res.data.success === false) {
            return;
        } 
        setList(res.data.lists)
  
      } catch (e) {
        console.log(e)
      }      
    };
    
    useEffect(() => {
      getAuth()
      if(id){
        getList()
      }
    }, [id])




  return (
    <div className='flex flex-col w-full min-h-screen'>
        <TopHeader info={info} setInfo={setInfo} />
        list {id}
        <Link href={`/screens/board/write/${id}/`}>
            <a>글쓰기 이동</a>
        </Link>
        {list.length > 0 && list.map((itm, idx) => (
          <div
            key={idx}
            onClick={() =>  router.push(`/screens/board/read/${itm['BOARD_CD']}/`)}
          >
            {itm['BOARD_TITLE']}
          </div>
        ))}

    </div>
  )
}

export default list
