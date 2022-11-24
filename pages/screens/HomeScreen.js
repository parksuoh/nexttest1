import TopHeader from '../../components/TopHeader'
import { useEffect, useState } from "react"
import axios from 'axios'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useBearStore from '../../zustand/state'
import Payment from '../../components/Payment'
import Head from 'next/head'

const HomeScreen = () => {
  const bears = useBearStore((state) => state.bears)
  const increasePopulation = useBearStore((state) => state.increasePopulation)
  const removeAllBears = useBearStore((state) => state.removeAllBears)
  const [info, setInfo] = useState()
  const [testpx, setTestpx] = useState('20')

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

  useEffect(() => {
    console.log(testpx)
  }, [testpx])
 

  return (
    <>
      <Head>
        <script src="https://code.jquery.com/jquery-1.12.4.min.js" />
        <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js" />
      </Head>
      <div className='flex flex-col w-full min-h-screen'>
        <TopHeader info={info} setInfo={setInfo} />
        <div>홈</div>
        <div>유저번호: {info && info.uid}</div>
        <div>이메일: {info && info.email}</div>
        <div>닉네임: {info && info.nick}</div>
        <div>이름: {info && info.name}</div>
        <div>레벨: {info && info.level}</div>
        <div
          onClick={increasePopulation}
        >
          zustand state {bears} 
        </div>
        <div
          onClick={removeAllBears}
        >
          clear
        </div>
        <div className='w-28 h-28'>
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
        </div>

        {/* <Payment /> */}

        <div 
          className={`h-14 bg-red-50`}
          style={{width: `${testpx}px`}}
        >
          d
        </div>

        <input
            type="text"
            onChange={(e)=> setTestpx(e.target.value)}
            value={testpx}
            placeholder="숫자"
        />

        <button
          className='w-24 h-12 bg-slate-50'
          onClick={() => {
            IMP.init('imp19424728');
            IMP.request_pay({
              pg: "html5_inicis",
              pay_method: "card",
              merchant_uid : 'merchant_'+new Date().getTime(),
              name : '결제테스트',
              amount : 14000,
              buyer_email : 'iamport@siot.do',
              buyer_name : '구매자',
              buyer_tel : '010-1234-5678',
              buyer_addr : '서울특별시 강남구 삼성동',
              buyer_postcode : '123-456'
            }, (response) => { // callback
                if (response.success) {
                  console.log(response)
                  // 결제 성공 시 로직,
                } else {
                  console.log(response)
                  // 결제 실패 시 로직,
                }
            });
          }}
        >
          아임포트
        </button>

        <button
          onClick={async()=>{
            try {
              // const res = await axios.post("http://info.sweettracker.co.kr/tracking/5", {t_key: "kJ3u661oKcyQVWJT5dx8IQ", t_code: "08", t_invoice: "404943445340"})
              const res = await axios.get('https://info.sweettracker.co.kr/api/v1/trackingInfo?t_code=08&t_invoice=404943445340&t_key=kJ3u661oKcyQVWJT5dx8IQ')

              console.log(res.data.trackingDetails)
            } catch (e) {
              console.log(e)
            }    
          }}
        >
          택배 추적
        </button>

      </div>
    </>
  )
}

export default HomeScreen
