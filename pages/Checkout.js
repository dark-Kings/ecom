import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs'
import Head from 'next/head';
import Script from 'next/script';
import { loadStripe } from '@stripe/stripe-js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ cart, clearCart, addtoCart, removefromCart, subTotal }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({ value: null })

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser && myuser.token) {
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
    }
  }, [])

  useEffect(() => {


    if (name.length >= 3 && email.length >= 3 && phone.length >= 3 && address.length >= 3 && pincode.length >= 3) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }

  }, [name, email, phone, pincode, address])


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
    setName(res.name)
    setAddress(res.address)
    setPincode(res.pincode)
    setPhone(res.phone)
    getpincode(res.pincode)
  }

  const getpincode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
      setState(pinJson[pin][1])
      setCity(pinJson[pin][0])
    }
    else {
      setCity('')
      setState('')
    }
  }



  const handleChange = async (e) => {


    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
      if (e.target.value.length == 6) {
        getpincode(e.target.value)
      }
      else {
        setCity('')
        setState('')
      }
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
  }

  const makePayment = async () => {

    const stripe = await loadStripe("pk_test_51N0MJISHiqiqoYUqLCpLRz5zDIqJm2ZEGwYtD5UjGFUEf4jIONrWpZrk9RAGxse7Tuiv29sSwybd6U75gEMbB16e00gWC8pzJs")

    // const stripe = await loadStripe(`${process.env.STRIPE_PK}`)
    let Oid = Math.floor(Math.random() * Date.now());
    const header = {
      "Content-type": "application/json"
    }

    const body = {
      cart: cart,
      subTotal: subTotal,
      email: email,
      name: name,
      address: address,
      pincode: pincode,
      phone: phone,
      state: state,
      city: city,
      Oid: Oid
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/checkout`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(body)
    })
    const session = await response.json()
    // console.log("checkout", session)

    await stripe.redirectToCheckout({ sessionId: session.sessionId }, { lineItems: session.products_details })

  }

  return (
    <div className='container m-auto p-12 bg-pink-50'>
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

      <Head>
        <title>Checkout -codeswear.com</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />

        <Script type='application/javascript' crossOrigin='anonymous' src={`${process
          .env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />
      </Head>



      <h1 className='text-3xl font-bold my-8 text-center'>Checkout</h1>
      <h2 className='text-xl mx-auto font-semibold mb-4'>1. Delivery Details.</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <label htmlFor="name"
            className="leading-7 text-sm text-gray-600">Name</label>
          <input type="text"
            id="name" name="name"
            onChange={handleChange}
            value={name}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="px-2 w-1/2">
          <label htmlFor="email"
            className="leading-7 text-sm text-gray-600">Email</label>

          {user && user.token ?
            <input type="email"
              id="email"
              name="email"
              readOnly={true}
              value={user.email}
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            : <input type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={email}
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />}



        </div>
      </div>
      <div className="px-2 w-full">
        <label htmlFor="address"
          className="leading-7 text-sm text-gray-600">Address</label>
        <textarea id="address"
          name="address"
          cols='30' rows='2'
          onChange={handleChange}
          value={address}
          className="w-full  bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <label htmlFor="phone"
            className="leading-7 text-sm text-gray-600">Phone</label>
          <input type="text"
            id="phone"
            name="phone"
            placeholder='10 Digit - Phone Number'
            onChange={handleChange}
            value={phone}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="px-2 w-1/2">
          <label htmlFor="pincode"
            className="leading-7 text-sm text-gray-600">PinCode</label>
          <input type="text"
            id="pincode"
            name="pincode"
            onChange={handleChange}
            value={pincode}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <label htmlFor="state"
            className="leading-7 text-sm text-gray-600">State</label>
          <input type="text"
            id="state"
            name="state"
            //  readOnly={true}
            value={state}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="px-2 w-1/2">
          <label htmlFor="city"
            className="leading-7 text-sm text-gray-600">District</label>
          <input type="text"
            id="city"
            name="city"
            // readOnly={true}
            value={city}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <h2 className='text-xl mx-auto font-semibold mb-4 mt-4'>2. Review Cart Item</h2>


      <div className="slideCart  h-full   bg-pink-100 p-10 z-10 ">
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 && <div className='mt-4 font-semibold'>Your cart is Empty!</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/4 mx-3 font-semibold'>{cart[k].name}</div>
                <div className='w-1/4 flex font-semibold items-center justify-center text-xl'><AiOutlineMinusCircle className='cursor-pointer' onClick={() => { removefromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} /> <span className="mx-2">{cart[k].qty}</span> <AiOutlinePlusCircle className='cursor-pointer' onClick={() => { addtoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} /></div>
                <div className='w-1/4 flex font-semibold items-center justify-center text-xl'>{cart[k].price}</div>
              </div>
            </li>
          })}
        </ol>
        <span className="font-bold">Subtotal : ₹ {subTotal}</span>
      </div>
      <div className="flex space-x-2">
        {/* <Link href={'/Order'}>  <button disabled={disabled} className='disabled:bg-pink-300 flex ml-2 mt-4 p-8 text-white bg-pink-500 border-0 py-2 focus:outline-none hover:bg-pink-700 rounded text-sm' >
          <BsFillBagCheckFill className='m-1 ' /> Pay ₹{subTotal}</button></Link> */}


        <button disabled={disabled} className='disabled:bg-pink-300 flex ml-2 mt-4 p-8 text-white bg-pink-500 border-0 py-2 focus:outline-none hover:bg-pink-700 rounded text-sm' onClick={makePayment}><BsFillBagCheckFill className='m-1 ' /> Pay ₹{subTotal}</button>
      </div>
    </div>
  )
}

export default Checkout
