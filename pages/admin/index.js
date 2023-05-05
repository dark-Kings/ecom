import React, {useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import Dashboard from './Dashboard'

const index = () => {
  const [user, setUser] = useState({ value: null })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
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
    setRoll(res.Uroll)
    setName(res.name)
    setEmail(res.email)
    if(res.Uroll !=1){
      router.push('/')
    }
 
  }



  return (
    <div  className='flex min-h-screen'>
    <div className='bg-pink-300 min-h-screen w-1/4 pt-24 flex flex-col'>
    <Dashboard/> 
    </div>
    <div className=' min-h-screen w-3/4 py-5 flex flex-col bg-pink-50'>
    <div className='container  p-12'>
    <h1 className='text-3xl font-bold my-8 text-center'>Admin Details</h1>

    <div className="mx-auto flex">
        <div className="px-2 w-full">
          <label htmlFor="name"
            className="leading-7 text-sm text-gray-600">Name :</label>
           <div className='w-full mb-5 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'>{name}</div>
        </div>
        </div>
        
    <div className="mx-auto flex">
        <div className="px-2 w-full">
          <label htmlFor="name"
            className="leading-7 text-sm text-gray-600">Email :</label>
           <div className='w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'>{email}</div>
        </div>
        </div>




     </div> 
     
   </div>
   </div>
  
    )
}

export default index
