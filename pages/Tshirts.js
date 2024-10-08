import React from 'react'
import Link from 'next/link'
import Product from '../models/Product'
import mongoose from 'mongoose';
import Image from 'next/image';
import Head from 'next/head';


const Tshirts = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Tshits -codeswear.com</title>
      </Head>

      <div className="allproduct_container p-8 ">
        <h2 className="p-10 text-center font-semibold text-[80px] allproduct_containerh2">Tshirt</h2>
        <section className="min-h-screen text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center items-center">
              {Object.keys(products).map((item) => {
                return <Link legacyBehavior key={products[item]._id} href={`/product/${products[item].slug}`}>
                  <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg my-2 cursor-pointer bg-pink-50">
                    <a className="block relative  rounded overflow-hidden">
                      <Image
                        alt="ecommerce"
                        className="m-auto h-[30vh] md:h-[36vh] block"
                        src={products[item].img}
                        width={500} // Specify the width
                        height={500} // Specify the height
                      />
                    </a>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">  {`${products[item].title.length > 40 ? products[item].title.substring(0, 40) + '...' : products[item].title}`}</h2>
                      <p className="mt-1">₹ {products[item].price}</p>
                      <div className="mt-1">

                        {products[item].size.includes('S') && <span className='border border-gray-300 px-1'>S</span>}
                        {products[item].size.includes('M') && <span className='border border-gray-300 mx-1 px-1'>M</span>}
                        {products[item].size.includes('L') && <span className='border border-gray-300 mx-1 px-1'>L</span>}
                        {products[item].size.includes('XL') && <span className='border border-gray-300 mx-1 px-1'>XL</span>}
                        {products[item].size.includes('XXL') && <span className='border border-gray-300 mx-1 px-1'>XXL</span>}

                      </div>
                      <div className="mt-1">


                        {products[item].color.includes('white') && <button className="border-2 border-redy-500 ml-1 bg-white-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('red') && <button className="border-2 border-redy-500 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('yellow') && <button className="border-2 border-yellow-500 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('green') && <button className="border-2 border-green-500 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('black') && <button className="border-2 border-black-500 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('blue') && <button className="border-2 border-blue-500 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}


                      </div>
                    </div>
                  </div>
                </Link>
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {

    mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: 'tshirt' })
  let tshirts = {}
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
        tshirts[item.title].color.push(item.color);
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size);
      }
    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      }
      else {
        tshirts[item.title].color = []
        tshirts[item.title].size = []
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  }
}

export default Tshirts
