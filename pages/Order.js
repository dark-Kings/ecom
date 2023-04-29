import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import MyOrder from '../models/Order'
import mongoose from 'mongoose';

const Order = ({order,clearCart}) => {
  const router = useRouter()
  const [date, setDate] = useState('')
  const products = order.products
  useEffect(() => {
    const d =new Date(order.createdAt)
    setDate(d)
    if(router.query.clearCart==1){
      clearCart()
    }
  }, [])

  // console.log(order.orderId)
 
  return (
    <section className="text-gray-600 body-font overflow-hidden">
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
          <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
          <p className="leading-relaxed mb-4">Yayy! Your order had been successfully </p>
          <p className="leading-relaxed mb-4">Order placed On:{date && date.toLocaleDateString("en-IN",{weekday:'long', year:'numeric', month:'long',day:'numeric'})}</p>
          <p>ordered Your payment status is <span className='font-semibold text-slate-500'>{order.status}</span></p>
          <div className="flex mb-4">
          <a className="flex-grow  py-2 text-lg px-1">Item Description</a>
          <a className="flex-grow  border-gray-300 py-2 text-lg px-1">Quantity</a>
          <a className="flex-grow  border-gray-300 py-2 text-lg px-1">Item Total</a>
        </div>
         
         
         
       {    Object.keys(products).map((key,index)=>{

        return <div key={index} className="flex border-t border-gray-200 py-2">
        <span className="text-gray-500">{products[key].name}</span>
        <span className="mr-auto ml-16 text-center text-gray-900">{products[key].qty}</span>
        <span className="mr-auto ml-20 text-center text-gray-900">{products[key].qty} X{products[key].price}&nbsp; = ₹ {products[key].qty*products[key].price}</span>
      </div>

       })}

          <div className="flex">
            <span className="title-font font-medium text-2xl my-8 text-gray-900">SubTotal ₹ {order.amount}</span>
            <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
          </div>
        </div>
        <img alt="ecommerce" className="lg:w-1/2 w-52 m-auto lg:h-auto  object-cover object-center rounded" src="https://m.media-amazon.com/images/I/81+M4epHh4L._AC_SY500._SX._UX._SY._UY_.jpg"/>
      </div>
    </div>
  </section>
  )
}


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {

    mongoose.connect(process.env.MONGO_URI)
  }
  let order = await MyOrder.findById(context.query.id )
  return {
    props: { order: JSON.parse(JSON.stringify(order))}, // will be passed to the page component as props
  }
}


export default Order
