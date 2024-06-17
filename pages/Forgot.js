import React, {useEffect, useState} from 'react'
import {AiOutlineLock } from 'react-icons/ai';
import Link from 'next/link';
import Head from 'next/head';
import emailjs from "@emailjs/browser";
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
   }, [])



   const handleChange = async (e) => {


    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value)
    }
  }

 const sendResetEmail= async (e)=>{
  let data = { email, sendMail:true}
  const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })

  let res = await a.json();
  
  if(res.success){
  e.preventDefault();
  setLoading(true);


  emailjs.send(
    // import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
    'service_ja43e7i',
    // import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
    'template_bcwomjs',
    {
      from_name: res.name,
      to_name: "Anshul",
      from_email: email,
      to_email: "anshulpant14@gmail.com",
      message: res.emails,
    },
    // import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    'NbhAYb4ujSinSanZ5'
  )

    .then(
      () => {
        setLoading(false);
        toast.success("Password reset instruction have been sent to your email", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      (error) => {
        setLoading(false);
        // console.error(error);

        toast.error("something went wrong try again", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    );
  
  
  }
  else{
    toast.error("something went wrong try again", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
 }


 const resetPassword= async ()=>{
  const tokens= router.query.token

  if(password==cpassword){
  let data = { tokens,password, sendMail:false}
  const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })

  let res = await a.json();
  if(res.success){
    toast.success("Password has been changed", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
     setTimeout(() => {
      router.push('/Login')
     }, [800]);
  }
  else{
    toast.error("something went wrong try again", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}
 }


  return (
    <>
      <Head>
        <title>Forget -codeswear.com</title>
        </Head>
        <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <div className="min-h-screen flex items-start  justify-center py-24 px-4 sm:px-6 lg:px-8 bg-pink-50">
        <div className="w-full max-w-md space-y-8">
          <div>
           
            <img
              className="mx-auto h-20 w-auto"
              src="/logo.jpg"
              alt="Your Company"
            />
            <h2 className=" text-center text-3xl font-bold tracking-tight text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
    
              <Link href="/Login" className="font-medium text-pink-600 hover:text-pink-500">
                Login
              </Link>
            </p>
          </div>
          {router.query.token  && <div>
       
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  autoComplete="password"
                  value={password}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="cpassword" className="sr-only">
                 Confirm Password
                </label>
                <input
                  id="cpassword"
                  onChange={handleChange}
                  name="cpassword"
                  type="password"
                  value={cpassword}
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Confirm password"
                />
              </div>
      
            </div>
            <div>
              <button
             
                onClick={resetPassword}
                type="submit"
                className="group relative my-4 flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiOutlineLock className="h-5 w-5 text-white group-hover:text-pink-400"/>
                </span>
                Change Password
              </button>
            </div>
          {password != cpassword &&
            <span className='text-red-600'>Password don't matched</span>}
         {password == cpassword && password &&
            <span className='text-green-600'>Password  matched</span>}

          </div>}
         {!router.query.token && <div>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  onChange={handleChange}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
      
            </div>
            <div>
              <button
              onClick={sendResetEmail}
                type="submit"
                className="group relative my-4 flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiOutlineLock className="h-5 w-5 text-white group-hover:text-pink-400"/>
                </span>
                Change Password
              </button>
            </div>
          </div>
          }
        </div>
      </div>
    </>
  )
}

export default Forgot
