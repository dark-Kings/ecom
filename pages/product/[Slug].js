import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react';
import Product from '../../models/Product'
import mongoose from 'mongoose';
import Error from 'next/error';
import Head from 'next/head';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slug = ({ addtoCart, product, variants, buyNow, error }) => {
  const router = useRouter();
  const { Slug } = router.query;
  const [pin, setPin] = useState()
  const [service, setService] = useState()

  const [color, setColor] = useState()
  const [size, setSize] = useState()

  useEffect(() => {
    if (!error) {

      setColor(product.color)
      setSize(product.size)

    }
  }, [router.query])


  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
      setService(true)
      toast.success('your pincode is successable', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      setService(false)
      toast.error('Sorry, Your Pincode not Serviceavle!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const onChangePin = (e) => {
    setPin(e.target.value)
  }





  const refreshVariant = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]['Slug']}`
    // window.location = url;
    router.push(url)
  }

  if (error == 404) {
    return <Error statusCode={404} />
  }
  return <div>
    <section className="min-h-screen text-gray-600 body-font overflow-hidden py-8">
      <Head>
        <title>Details -codeswear.com</title>
      </Head>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="container px-5 py-24 mx-auto bg-pink-50">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Image
            alt="ecommerce"
            className="lg:w-1/2 sm:m-auto w-full sm:w-96  px-16 lg:h-auto  object-cover object-top rounded"
            src={product.img}
            width={500} // Specify the width
            height={500} // Specify the height
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>
            {/* <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div> */}
            <p className="leading-relaxed">{product.desc}.</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes("white") && Object.keys(variants['white']).includes(size) && <button onClick={(e) => { refreshVariant(size, "white") }} className={`border-2 border-gray-300  bg-white rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes("red") && Object.keys(variants['red']).includes(size) && <button onClick={(e) => { refreshVariant(size, "red") }} className={`border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes("green") && Object.keys(variants['green']).includes(size) && <button onClick={(e) => { refreshVariant(size, "green") }} className={`border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes("yellow") && Object.keys(variants['yellow']).includes(size) && <button onClick={(e) => { refreshVariant(size, "yellow") }} className={`border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'yellow' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes("black") && Object.keys(variants['black']).includes(size) && <button onClick={(e) => { refreshVariant(size, "black") }} className={`border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'black' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes("blue") && Object.keys(variants['blue']).includes(size) && <button onClick={(e) => { refreshVariant(size, "blue") }} className={`border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'}`}></button>}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                    {color && Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                    {color && Object.keys(variants[color]).includes('M') && <option value={'M'}>L</option>}
                    {color && Object.keys(variants[color]).includes('L') && <option value={'L'}>XL</option>}
                    {color && Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                    {color && Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              {product.availableQty <= 0 && <span className="title-font font-medium text-2xl text-gray-900">Out of Stock!</span>}
              {product.availableQty > 0 && <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>}
              {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center  text-gray-500 ml-2 sm:ml-4 mr-1">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button> */}
              <button disabled={product.availableQty <= 0} onClick={() => { buyNow(Slug, 1, product.price, `${product.title}(${product.size}/${product.color})`, product.size, product.color) }} className="disabled:bg-pink-300 flex  ml-auto  text-white bg-pink-500 border-0 text-sm py-2 px-[1px] md:px-6 focus:outline-none hover:bg-pink-600 rounded">Buy Now</button>
              <button disabled={product.availableQty <= 0} onClick={() => { addtoCart(Slug, 1, product.price, `${product.title}(${product.size}/${product.color})`, product.size, product.color) }} className="disabled:bg-pink-300 flex ml-2  text-white bg-pink-500 border-0 py-2 text-sm px-[1px] md:px-6 focus:outline-none hover:bg-pink-600 rounded">Add to Cart</button>
            </div>
            <div className="pin mt-6 flex  text-sm ">
              <input onChange={onChangePin} placeholder="Enter your pincode" className='title-font w-2/3 px-1 lg:mr-5 ssm:w-56 font-medium ml-1 ssm:text-2xl text-gray-900 border-2 border-gray-300 rounded-md' type="text" />
              <button onClick={checkServiceability} className='flex mt-2 w-1/3 ml-2  ssm:w-32 ssm:ml-auto text-white  bg-pink-500 border-0 py-2 px-6 ssm:px-8  focus:outline-none hover:bg-pink-600 rounded'> Check</button>
            </div>
            {(!service && service != null) && <div className='text-red-700 text-sm mt-3'>
              Sorry! We do not deliver to this pincode yet
            </div>}
            {(service && service != null) && <div className='text-green-700 text-sm mt-3'>
              Yay! This pincode is serviceable
            </div>}
          </div>
        </div>
      </div>
    </section>
  </div>;
};

export async function getServerSideProps(context) {
  let error = null
  if (!mongoose.connections[0].readyState) {

    mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({ slug: context.query.Slug })
  if (product == null) {
    return {
      props: { error: 404 }
    }
  }
  let variants = await Product.find({ title: product.title, category: product.category })
  let colorSizeSlug = {}   //{red : {xl:{slug:'wear-the-code-xl;'}}}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { Slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { Slug: item.slug }

    }
  }



  return {
    props: { error: error, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) } // will be passed to the page component as props
  }
}

export default Slug;
