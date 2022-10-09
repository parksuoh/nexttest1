import { useState } from "react"
import TopHeader from "../../../components/TopHeader"
import axios from 'axios'
import { useRouter } from "next/router"

const register = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [nick, setNick] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const onRegister = async() => {
        try {
            const res = await axios.post('http://localhost:4000/api/user/register/', 
            {
                email, 
                pass,
                nick,
                name,
                phone,
            })
            
            if(res.data.success === false && res.data.code === 1) {
                alert('이미 존재하는 이메일')
                return;
            } else if (res.data.success === false && res.data.code === 2) {
                alert('이미 존재하는 닉네임')
                return;
            } else if(res.data.success === false) {
                alert('실패')
                return;
            }
            console.log('회원가입 성공')
            router.push('/screens/user/login')
          } catch (e) {
            console.log(e)
          }
    }

  return (
    <div className='flex flex-col w-full min-h-screen'>
        <TopHeader />
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center w-96 h-96 border border-black border-solid">
                <div>회원가입</div>
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
                <input
                    type="text"
                    onChange={(e)=> setNick(e.target.value)}
                    value={nick}
                    placeholder="nickname"
                />
                <input
                    type="text"
                    onChange={(e)=> setName(e.target.value)}
                    value={name}
                    placeholder="name"
                />
                <input
                    type="text"
                    onChange={(e)=> setPhone(e.target.value)}
                    value={phone}
                    placeholder="phone"
                />
                <button 
                    type='button'
                    onClick={() => onRegister()}
                >
                    회원가입 하기
                </button>
            </div>
        </div>
    </div>
  )
}

export default register
