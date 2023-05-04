import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Dashboard from '../Dashboard'
import Product from "../../../models/Product";
import mongoose from "mongoose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data } from 'autoprefixer';

const UpdateProduct = ({ product, variants, error }) => {
  const [user, setUser] = useState({ value: null })
  const [title, setTitle] = useState('')
  const [Sslug, setSlug] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('')
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [price, setPrice] = useState('')
  const [availableQty, setAvailableQty] = useState('')
  const [img, setImg] = useState('')
  const [roll, setRoll] = useState(0)
  const router = useRouter();

  // const slug = router.query.slug;



  useEffect(() => {
    if (!error) {

      setColor(product.color)
      setSize(product.size)
      setSlug(product.slug)
      setDesc(product.desc)
      setAvailableQty(product.availableQty)
      setImg(product.img)
      setCategory(product.category)
      setPrice(product.price)
      setTitle(product.title)

    }
  }, [router.query])

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (!myuser) {
      router.push('/')
    }
    if (myuser && myuser.token) {
      setUser(myuser)


    }
  }, [router.query])



  const refreshVariant = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/admin/Product/UpdateProduct?slug=${variants[newcolor][newsize]['Slug']}`
    router.push(url)
  }



  const handleChange = async (e) => {

    if (e.target.name == 'size') {
      setSize(e.target.value)
    }
    else if (e.target.name == 'color') {
      setColor(e.target.value)
    }
    else if (e.target.name == 'price') {
      setPrice(e.target.value)
    }
    else if (e.target.name == 'availableQty') {
      setAvailableQty(e.target.value)
    }
    else if (e.target.name == 'img') {
      setImg(e.target.value)
    }
    else if (e.target.name == 'desc') {
      setDesc(e.target.value)
    }


  }


  const handleUpdate = async () => {

    let data = { img, price, availableQty,desc,Sslug }

    //  console.log(data)
    const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updProd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })

    let res = await a.json();
    if (res.success) {
      toast.success("Product Updated successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push(window.location.href)

    }
    else {
      toast.error(res.error, {
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

 const handleDelete = async()=>{
  const data = {slug:Sslug}
  const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/dleProd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })

  let res = await a.json();
  if (res.success) {
    toast.success("Product Deleted successfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const url = "/admin/Products"
    setTimeout(() => {
      router.push(url)
    },800);

  }
  else {
    toast.error(res.error, {
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
    <div className='flex min-h-screen'>
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
      <div className='bg-sky-300 min-h-screen w-1/4 pt-24 flex flex-col'>
        <Dashboard />
      </div>
      <div className=' min-h-screen w-3/4  flex flex-col my-5 bg-sky-50'>


        <h1 className='text-3xl font-bold  text-center pt-20'>Current Product</h1>
        <div className="container px-5 pt-10 mx-auto my-5">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 sm:m-auto w-full sm:w-96  px-16 lg:h-auto  object-cover object-top rounded " src={product.img} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>
              <p className="leading-relaxed">{product.desc}.</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("white") && Object.keys(variants['white']).includes(size) && <button onClick={(e) => { refreshVariant(size, "white") }} className={`border-2 border-gray-300  bg-white rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes("red") && Object.keys(variants['red']).includes(size) && <button onClick={(e) => { refreshVariant(size, "red") }} className={`border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes("green") && Object.keys(variants['green']).includes(size) && <button onClick={(e) => { refreshVariant(size, "green") }} className={`border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes("yellow") && Object.keys(variants['yellow']).includes(size) && <button onClick={(e) => { refreshVariant(size, "yellow") }} className={`border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'yellow' ? 'border-black' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes("black") && Object.keys(variants['black']).includes(size) && <button onClick={(e) => { refreshVariant(size, "black") }} className={`border-2 border-gray-300 ml-1 bg-black-500 rounded-full w-6 h-6 focus:outline-none ${color === 'black' ? 'border-black' : 'border-gray-300'}`}></button>}
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
            </div>
          </div>
        </div>

     <hr />

        <div className='container  my-5'>
          <h1 className='text-3xl font-bold  text-center'>Update Product</h1>
          <h2 className='text-2xl mx-auto font-semibold mb-4 ml-2'>Details.</h2>
          <div className="mx-auto flex">
            <div className="px-2 w-1/2">
              <label htmlFor="title"
                className="leading-7 text-sm text-gray-600">Title</label>
              <input type="text"
                id="title" name="title"
                readOnly={true}
                value={title}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="px-2 w-1/2">
              <label htmlFor="Sslug"
                className="leading-7 text-sm text-gray-600">Slug</label>
              <input type="text"
                id="Sslug" name="Sslug"
                readOnly={true}
                value={Sslug}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="mx-auto flex">
            <div className="px-2 w-full">
              <label htmlFor="desc"
                className="leading-7 text-sm text-gray-600">Description</label>
              <textarea id="desc"
                name="desc"
                cols='30' rows='2'
                onChange={handleChange}
                value={desc}
                className="w-full  bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
            </div>

          </div>

          <div className="mx-auto flex">
            <div className="px-2 w-1/2">
              <label htmlFor="category"
                className="leading-7 text-sm text-gray-600">Category</label>
              <input type="text"
                id="category"
                name="category"
                readOnly={true}
                value={category}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="px-2 w-1/2">
              <label htmlFor="size"
                className="leading-7 text-sm text-gray-600">Size</label>
              <input type="text"
                id="size"
                name="size"
              readOnly={true}
                value={size}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="mx-auto flex">
            <div className="px-2 w-1/2">
              <label htmlFor="color"
                className="leading-7 text-sm text-gray-600">Color</label>
              <input type="text"
                id="color"
                name="color"
                value={color}
                readOnly={true}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="px-2 w-1/2">
              <label htmlFor="price"
                className="leading-7 text-sm text-gray-600">Price</label>
              <input type="number"
                id="price"
                name="price"
                value={price}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="mx-auto flex">
            <div className="px-2 w-1/2 ">
              <label htmlFor="availableQty"
                className="leading-7 text-sm text-gray-600 ">Available Qantity</label>
              <input type="text"
                id="availableQty"
                name="availableQty"
                value={availableQty}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="px-2 w-1/2">
              <label htmlFor="img"
                className="leading-7 text-sm text-gray-600">Image Url</label>
              <input type="text"
                id="img" name="img"
                onChange={handleChange}
                value={img}
                placeholder='Please Enter image link'
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="mx-auto flex">
            <div className="p-3 w-full text-center">
              <button onClick={handleUpdate} className='bg-sky-500 hover:bg-sky-600 px-2 rounded-md py-1 my-5 w-full h-[50px] text-xl text-white mx-2'>Update Product</button>
              <button onClick={handleDelete} className='bg-sky-500 hover:bg-sky-600 px-2 rounded-md py-1 my-5 w-full h-[50px] text-xl text-white mx-2'>Delete Product</button>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}




export async function getServerSideProps(context) {
  let error = null
  if (!mongoose.connections[0].readyState) {

    mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({ slug: context.query.slug })
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

export default UpdateProduct


