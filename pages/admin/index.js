import React, {useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import Dashboard from './Dashboard'

const index = () => {
  const [user, setUser] = useState({ value: null })
  const [roll, setRoll] = useState(0)

  const router = useRouter();
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (!myuser) {
      router.push('/')
    }
    if (myuser && myuser.token) {
      setUser(myuser)

      fetchData(myuser.token)
    }
  }, [router.query])


  const fetchData = async (token) => {
    let data = { token: token }
    const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })

    let res = await a.json();
    setRoll(res.__v)
    if(res.Uroll !=1){
      router.push('/')
    }
 
  }

  return (
    <div  className='flex min-h-screen'>
    <div className='bg-yellow-300 min-h-screen w-1/4 pt-24 flex flex-col'>
    <Dashboard/> 
    </div>
    <div className='bg-pink-300 min-h-screen w-3/4 pt-24 flex flex-col'>
      admin
   </div>
   </div>
  
    )
}

export default index
