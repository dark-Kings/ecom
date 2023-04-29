import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

const Orders = () => {
  const router = useRouter();
  const [orders, setorders] = useState([])
  useEffect(() => {
    const fetchOrder = async () => {


        const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
        })
        let res = await a.json()
        setorders(res.orders)
      }
      if (!localStorage.getItem('myuser')) {
        router.push('/')
      }
      else {
        fetchOrder()
    }


  }, [router.query])
  return (
    <div className='min-h-screen'>
      <h1 className='font-semibold text-center text-2xl p-8'>My Orders</h1>
      <div className="container  mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">#Order ID</th>
                      <th scope="col" className="px-6 py-4">Emailt</th>
                      <th scope="col" className="px-6 py-4">Amount</th>
                      <th scope="col" className="px-6 py-4">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                   {orders.map((item,i)=>{
                    return  <tr key={i}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-500 dark:border-neutral-500 dark:hover:bg-neutral-400">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{item.orderId}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                    <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link href={`/Order/?id=${item._id}`}>Details</Link>
                    </td>
                  </tr>
             
                   })}
                    


                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {

//     mongoose.connect(process.env.MONGO_URI)
//   }
//   let orders = await Order.find()


//   return {
//     props: { orders: orders }, // will be passed to the page component as props
//   }
// }

export default Orders
