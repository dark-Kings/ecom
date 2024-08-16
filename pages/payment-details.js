// Import necessary modules
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Component function for payment details page
export default function PaymentDetails({ clearCart }) {
  const router = useRouter();
  const { session_id } = router.query; // Retrieve session_id from query parameters
  const [paymentInfo, setPaymentInfo] = useState(null); // State to hold payment information
  const [date, setDate] = useState('')

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get-payment-details?session_id=${session_id}`);
        const data = await response.json();

        // console.log(data)

        setPaymentInfo(data.orderDetail);
        const d = new Date(data.orderDetail.createdAt)
        setDate(d)
        if (data.clearCart === 1) {
          clearCart()
        }
        // console.log(data.orderDetail.products, d) // Set paymentInfo state with fetched data
      } catch (error) {
        console.error('Error fetching payment details:', error.message);
      }
    };

    if (session_id) {
      fetchPaymentDetails();
    }
  }, [session_id]); // Dependency array ensures useEffect runs when session_id changes

  return (
    <div className='min-h-screen pt-24 bg-pink-50'>
      {paymentInfo ? (
        <section className="bg-white py-8 antialiased  md:py-28">

          <div className="mx-auto max-w-5xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl mb-2">Thanks for your order!</h2>
            <p className="text-gray-500  mb-6 md:mb-8">Your order <p className="font-medium text-gray-900  hover:underline">#{paymentInfo.orderId}</p> will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.</p>
            <div className='flex flex-col sm:flex-row sm:justify-between gap-4'>
              <div className='w-full'>
                <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6   mb-6 md:mb-8">
                  <dl className="sm:flex items-center justify-between gap-4">
                    <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">Date</dt>
                    <dd className="font-medium text-gray-900  sm:text-end">{date && date.toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                  </dl>
                  <dl className="sm:flex items-center justify-between gap-4">
                    <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">Name</dt>
                    <dd className="font-medium text-gray-900  sm:text-end">{paymentInfo.name}</dd>
                  </dl>
                  <dl className="sm:flex items-center justify-between gap-4">
                    <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">Address</dt>
                    <dd className="font-medium text-gray-900  sm:text-end">{`${paymentInfo.address}, ${paymentInfo.city}, ${paymentInfo.pincode}, ${paymentInfo.state}, India`}</dd>
                  </dl>
                  <dl className="sm:flex items-center justify-between gap-4">
                    <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">Phone</dt>
                    <dd className="font-medium text-gray-900  sm:text-end">+91 {paymentInfo.phone}</dd>
                  </dl>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none ">Track your order</Link>
                  <Link href="/" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Return to shopping</Link>
                </div>
              </div>
              <div className="w-full">
                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 mb-6 md:mb-8">
                  <p className="">Order summary</p>
                  <div className="">
                    <table className="w-full">
                      <tbody className="w-full">
                        {Object.keys(paymentInfo.products).map((item) => (
                          <tr key={item} className=' flex flex-row justify-between gap-4'>
                            <td className="">
                              <div className="sm:flex sm:flex-row justify-between gap-4">
                                <img className="" width={'50px'} src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                <div className="">{paymentInfo.products[item].name}</div>
                              </div>
                            </td>

                            <td className="">₹{paymentInfo.products[item].price} x {paymentInfo.products[item].qty}</td>

                            <td className="">₹{paymentInfo.products[item].price * paymentInfo.products[item].qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="">
                    <dl className="flex w-full flex-row justify-between gap-4">
                      <dt>Total</dt>
                      <dd>₹{paymentInfo.amount}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
}
