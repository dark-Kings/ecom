import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import {AiOutlineLock } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

const Login = () => {

  const router = useRouter();
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  
 useEffect(() => {
  if(localStorage.getItem('myuser')){
    router.push('/')
  }
 }, [])

  const handleChange = (e) => {

   if (e.target.name == 'email') {
      setemail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setpassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {  email, password }
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json();
    setemail("")
    setpassword("")

    if(response.success){
      localStorage.setItem('myuser',JSON.stringify({token:response.token,email:response.email}))
      // localStorage.setItem('token',response.token)
    toast.success('Your are successfully logged in', {
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
      router.push(`${process.env.NEXT_PUBLIC_HOST}/`)
    }, 800);
  }else{
    toast.error(response.error, {
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

  return (
    <>
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
    <div className="min-h-screen flex items-start  justify-center py-24 px-4 sm:px-6 lg:px-8 bg-sky-50">
    <Head>
        <title>Login -codeswear.com</title>
        </Head>
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-20 w-auto"
              src="/logo.jpg"
              alt="Your Company"
            />
            <h2 className=" text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link href="/Signup" className="font-medium text-sky-700 hover:text-sky-500">
                SignUp
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6"  method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                 onChange={handleChange}
                  id="email"
                  value={email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                 onChange={handleChange}
                  id="password"
                  value={password}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
          

              <div className="text-sm">
                <Link href="/Forgot" className="font-medium text-sky-700 hover:text-sky-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiOutlineLock className="h-5 w-5 text-white group-hover:text-sky-400"/>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
