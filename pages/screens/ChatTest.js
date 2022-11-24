import {useEffect, useState} from 'react';
import axios from 'axios'
import TopHeader from '../../components/TopHeader';
import io from 'socket.io-client';



function useSocket(url) {
    const [socket, setSocket] = useState(null)
  
    useEffect(() => {
      const socketIo = io(url)
  
      setSocket(socketIo)
  
      function cleanup() {
        socketIo.disconnect()
      }
      return cleanup

    }, [])
  
    return socket
  }

const ChatTest = () => {
    const socket = useSocket('http://localhost:4000')
    
    const [info, setInfo] = useState()
    const [text, setText] = useState('')
    const [lists, setLists] = useState(['test1'])


    useEffect(() => {
        if(socket) {
            socket.on("message", (data) => {
                console.log(data)
                setLists((res) => [...res, data])
            });
        }

    }, [socket]);


    const sendMsg = () => {
        setLists((res) => [...res, text])
        socket.emit("message", text);
        setText('')
    }

    useEffect(() => {console.log(lists)}, [lists])




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
    <div>
        <TopHeader info={info} setInfo={setInfo} />
        {lists.length > 0 && lists.map((item, idx) => <h3 style={{border: '1px solid gray'}} key={idx}>{item}</h3>)}

        <input
            type="text"
            onChange={(e)=> setText(e.target.value)}
            value={text}
            placeholder="채팅하셈"
        />
        <button
            onClick={sendMsg}
        >
            보내기
        </button>

       
    </div>
  )
}

export default ChatTest
