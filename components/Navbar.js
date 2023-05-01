import React, { useRef , useState,useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiFillCloseCircle, AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs'
import { useRouter } from 'next/router';
import { MdAccountCircle } from 'react-icons/md'

const preventDefault = f => e => {
  e.preventDefault()
  f(e)
}

const Navbar = ({logout,user, cart, addtoCart, removefromCart, clearCart, subTotal,action = '/Search'}) => {

   const [drodown, setDropdown] = useState(false)
   const [sidebar, setSidebar] = useState(false)
   const router = useRouter()
  // console.log(cart,addtoCart,removefromCart,clearCart,subTotal)
  // console.log(removefromCart)


  useEffect(() => {
    Object.keys(cart).length !==0 && setSidebar(true)
    let exempted = ['/Checkout','/Order','/Orders','/myaccount','/','/About','/Contact','/Login','/Signup','/Forgot']
    if(exempted.includes(router.pathname))
     {
      setSidebar(false)
     }
  }, [])

  const toggleCart = () => {
    // if (ref.current.classList.contains('translate-x-full')){
    //   ref.current.classList.remove('translate-x-full')
    //   ref.current.classList.add('translate-x-0')
    //   ref.current.classList.add('hidden')
    // }
    // else if (!ref.current.classList.contains('translate-x-full')){
    //   ref.current.classList.remove('translate-x-0')
    //   ref.current.classList.add('translate-x-full')
    //   ref.current.classList.add('block')
    // }
    // if (ref.current.classList.contains('hidden')) {
    //   ref.current.classList.remove('hidden')
    //   ref.current.classList.add('block')
    // }
    // else if (!ref.current.classList.contains('hidden')) {
    //   ref.current.classList.remove('block')
    //   ref.current.classList.add('hidden')
    // }
    setSidebar(!sidebar)
  }


  const ref = useRef();
  const [query, setQuery] = useState('')
  const handleParam = setValue => e => setValue(e.target.value)
  const handleSubmit = preventDefault(() => {
    router.push({
      pathname: action,
      query: {q: query},
    })
  })

  return (
    <div className={`flex flex-col justify-center items-center md:flex-row md:justify-start  shadow-md sticky top-0 bg-white z-10 `}>
      <Link href={'/'}>
        <div className="logo mr-auto md:mx-5">
          <Image src="/logo.jpg" alt="" height={30} width={70} priority />
        </div>
      </Link>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md justify-center'>
          <Link legacyBehavior href={'/AllProducts'}><a><li className='my-2 ml-2 hover:text-pink-600'>Products</li></a></Link>
          <Link legacyBehavior href={'/Tshirts'}><a><li className='my-2 ml-2 hover:text-pink-600'>Tshirts</li></a></Link>
          <Link legacyBehavior href={'/Hoodies'}><a><li className='my-2 hover:text-pink-600'>Hoodies</li></a></Link>
          <Link legacyBehavior href={'/Stickers'}><a><li className='my-2 hover:text-pink-600'>Stickers</li></a></Link>
          <Link legacyBehavior href={'/Mugs'}><a><li className='my-2 mr-2 hover:text-pink-600'>Mugs</li></a></Link>
        </ul>
      </div>


      <form onSubmit={handleSubmit}>   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input
        type="search"
        id="default-search"
        name='q'
        value={query}
        onChange={handleParam(setQuery)}
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Searching..."
        required/>
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-pink-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>



      <div className="Cart items-center cursor-pointer absolute right-0 top-5 mx-5 flex">
        <span onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
     {drodown && <div  onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute right-7 top-5 bg-white shadow-lg border rounded-md px-5 py-3 w-32">
        <ul>
          <a href={'/myaccount'}><li className='py-1 text-sm  hover:text-pink-700 font-bold '>My Account</li></a>
          <a href={'/Orders'}><li className='py-1 text-sm  hover:text-pink-700 font-bold '>Orders</li></a>
          <li onClick={logout} className='py-1 text-sm  hover:text-pink-700 font-bold '>Logout</li>
        </ul>
      </div>}
        {user.value && <MdAccountCircle  className='text-xl md:text-3xl mx-2' />}
        </span>
        {!user.value && <Link href='/Login'>
          <button className='bg-pink-500 px-2 rounded-md py-1 text-sm text-white mx-2'>Login</button>
        </Link>}
        <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-3xl' />
      </div>
      
      


      <div ref={ref} className={`slideCart w-72 overflow-y-scroll  h-[100vh] ${sidebar? 'block' : 'hidden'} absolute top-0 right-0 transition-all bg-pink-100 p-10 z-10 `}>
        <h2 className='text-center mb-2 font-bold'> Shopping Cart</h2>
        <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-pink-500'><AiFillCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length === 0 && <div className='mt-4 font-semibold'>Your cart is Empty!</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className='w-2/4 mx-3 font-semibold'>{cart[k].name}</div>
                <div className='w-1/4 flex font-semibold items-center justify-center text-xl ml-2'><AiOutlineMinusCircle className='cursor-pointer' onClick={() => { removefromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} /> <span className="mx-2">{cart[k].qty}</span> <AiOutlinePlusCircle className='cursor-pointer' onClick={() => { addtoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} /></div>
                <div className='w-1/4 flex font-semibold items-center justify-center text-xl ml-2'>{cart[k].price}</div>
              </div>
            </li>
          })}
        </ol>
        <div className="font-bold my-4 mt-6">Subtotal : ₹ {subTotal}</div>
        <div className="flex space-x-2">
          
          <Link href={'/Checkout'}>  <button  disabled={Object.keys(cart).length==0} className='disabled:bg-pink-300 flex  mt-8 p-4 text-white bg-pink-500 border-0 py-2 focus:outline-none hover:bg-pink-700 rounded text-sm'><BsFillBagCheckFill className='m-1 ' /> Checkout</button></Link>


          <button disabled={Object.keys(cart).length==0} onClick={clearCart} className='disabled:bg-pink-300 flex  mt-8 p-4 text-white bg-pink-500 border-0  py-2 focus:outline-none hover:bg-pink-700 rounded text-sm'> Clear Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar

