import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Dashboard'

const AddProduct = () => {
  const [user, setUser] = useState({ value: null })
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('')
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [price, setPrice] = useState('')
  const [availableQty,setAvailableQty] = useState('')
  const [img, setImg] = useState('')
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
    setRoll(res.__v)
    if (res.Uroll != 1) {
      router.push('/')
    }

  }

  const handleChange = async (e) => {


    if (e.target.name == 'title') {
      setTitle(e.target.value)
    }
    else if(e.target.name=='slug'){
      setSlug(e.target.value)
    }
    else if(e.target.name=='desc'){
      setDesc(e.target.value)
    }
    else if(e.target.name=='category'){
      setCategory(e.target.value)
    }
    else if(e.target.name=='size'){
      setSize(e.target.value)
    }
    else if(e.target.name=='color'){
      setColor(e.target.value)
    }
    else if(e.target.name=='price'){
      setPrice(e.target.value)
    }
    else if(e.target.name=='availableQty'){
      setAvailableQty(e.target.value)
    }
    else if(e.target.name=='img'){
      setImg(e.target.value)
    }

  }


  const handleSubmit= async ()=>{

       let data = [{ title:title,slug:slug,desc:desc,img:img,category:category,size:size,color:color,price:price,availableQty:availableQty}]

      //  console.log(data)
      const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
  
      let res = await a.json();
      if(res.success){
        toast.success("Product added successfully", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTitle('')
        setSlug('')
        setDesc('')
        setCategory('')
        setSize('')
        setColor('')
        setPrice('')
        setAvailableQty('')
        setImg('')
      }
      else{
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
      <div className='bg-pink-300 min-h-screen w-1/4 pt-24 flex flex-col'>
        <Dashboard />
      </div>
      <div className=' min-h-screen w-3/4  flex  bg-pink-50'>
        <div className='container  p-12'>
          <h1 className='text-3xl font-bold my-8 text-center'>Add Product</h1>
          <h2 className='text-2xl mx-auto font-semibold mb-4 ml-2'>Details.</h2>
          <div className="mx-auto flex">
            <div className="px-2 w-1/2">
              <label htmlFor="title"
                className="leading-7 text-sm text-gray-600">Title</label>
              <input type="text"
                id="title" name="title"
                onChange={handleChange}
                value={title}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="px-2 w-1/2">
              <label htmlFor="slug"
                className="leading-7 text-sm text-gray-600">Slug</label>
              <input type="text"
                id="slug" name="slug"
                onChange={handleChange}
                value={slug}
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
                onChange={handleChange}
                value={category}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="px-2 w-1/2">
              <label htmlFor="size"
                className="leading-7 text-sm text-gray-600">Size</label>
              <input type="text"
                id="size"
                name="size"
                onChange={handleChange}
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
                onChange={handleChange}
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
            <div className="py-3 w-full text-center">
              <button onClick={handleSubmit} className='bg-pink-500 hover:bg-pink-600  rounded-md py-1 my-5 w-full h-[50px] text-xl text-white mx-2'>Add</button>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddProduct
