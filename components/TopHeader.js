import Link from "next/link";
import { useRouter } from "next/router"
import axios from 'axios'
import { useEffect, useState } from "react";

const TopHeader = ({info, setInfo}) => {
  const [lists, setLists] = useState([])
  const router = useRouter()

  const getMenu = async() => {
    try {
      const res = await axios.get('http://localhost:4000/api/board/get-board-menu/')

      if(res.data.success === false) {
          return;
      } 
      setLists(res.data.lists)

    } catch (e) {
      console.log(e)
    }      
  };

  useEffect(() => {
    getMenu()
  }, [])

  const onLogout = () => {
    setInfo()
    document.cookie = 'accessToken' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    document.cookie = 'refreshToken' + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    router.push('/screens/user/login')
  }

  return (
    <div className='flex flex-row items-center justify-between px-20 w-full h-24 bg-slate-50'>
        <Link href="/">
            <a>로고</a>
        </Link>
        {lists.length > 0 && lists.map((itm, idx) => (
          <div
            key={idx}
            onClick={() => router.push(`/screens/board/list/${itm['MENU_CD']}/`)}
          >
            {itm['MENU_TITLE']}
          </div>
        ))}
        {!info ? (
          <Link href="/screens/user/login">
            <a>로그인</a>
          </Link>
        ) : ( 
          <div
            onClick={() => onLogout()}
          >
            로그아웃
          </div>
        )}

    </div>
  )
}

export default TopHeader
