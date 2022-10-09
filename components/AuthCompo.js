import { useEffect } from "react"
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setInfo } from '../store/modules/user';

const AuthCompo = ({children}) => {
  const dispatch = useDispatch()

  const getAuth = async() => {
    try {
      const res = await axios.get('http://localhost:4000/api/user/auth/', { withCredentials: true })

      if(res.data.success === false) {
          return;
      } 
      dispatch(setInfo(res.data))

    } catch (e) {
      console.log(e)
    }      
  };
  
  useEffect(() => {
    getAuth()
  }, [])

  return (
    <div>
      {children}
    </div>
  )
}

export default AuthCompo
