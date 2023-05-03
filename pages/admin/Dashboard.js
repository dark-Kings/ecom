import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const router = useRouter()
  // router.push('/')
  if (typeof window !== "undefined"){
  if(window.location.href=="http://localhost:3000/admin/Dashboard"){
     router.push('/')
  }
}

  return (
    <div  className='flex min-h-screen'>
      <div className='bg-yellow-300 min-h-screen w-full pt-24 flex flex-col'>
      <Link href={'/admin'}>
        <div className='text-center text-2xl font-semibold p-3'>Admin </div> 
        </Link>

        <Link href={'/admin/AddProduct'}>
        <div className=' text-xl m-2 p-3'>Add new Product</div>
        </Link>

        <Link href={'/admin/UpdateProduct'}>
        <div className=' text-xl m-2 p-3'>Update Product</div>
        </Link>

     

      </div>
     
    </div>
  )
}

export default Dashboard