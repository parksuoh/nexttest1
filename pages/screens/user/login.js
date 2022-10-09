import { useState } from "react"
import TopHeader from "../../../components/TopHeader"
import Link from "next/link";
import axios from 'axios'
import { useRouter } from "next/router";


const login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const onLogin = async() => {
        try {
            const res = await axios.post('http://localhost:4000/api/user/login/', {email, pass}, { withCredentials: true })
            
            if(res.data.success === false && res.data.code === 1) {
                alert('이메일이 없음')
                return;
            } else if (res.data.success === false && res.data.code === 2) {
                alert('비밀번호가 틀림')
                return;
            } else if(res.data.success === false) {
                alert('실패')
                return;
            }
            router.push('/')
          } catch (e) {
            console.log(e)
          }
    }

  return (
    <div className='flex flex-col w-full min-h-screen'>
        <TopHeader />
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center w-96 h-96 border border-black border-solid">
                <div>로그인</div>
                <input
                    type="text"
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                    placeholder="email"
                />
                <input
                    type="password"
                    onChange={(e)=> setPass(e.target.value)}
                    value={pass}
                    placeholder="password"
                />
                <button 
                    type='button'
                    onClick={() => onLogin()}
                >
                    로그인 하기
                </button>
                <Link href="/screens/user/register">
                    <a>회원가입</a>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default login
