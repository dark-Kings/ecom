// Import necessary modules
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Component function for payment details page
export default function PaymentDetails() {
  const router = useRouter();
  const { session_id } = router.query; // Retrieve session_id from query parameters
  const [paymentInfo, setPaymentInfo] = useState(null); // State to hold payment information

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {        
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get-payment-details?session_id=${session_id}`);
        const data = await response.json();
        
        // console.log(data)

        setPaymentInfo(data); // Set paymentInfo state with fetched data
      } catch (error) {
        console.error('Error fetching payment details:', error.message);
      }
    };

    if (session_id) {
      fetchPaymentDetails();
    }
  }, [session_id]); // Dependency array ensures useEffect runs when session_id changes

  return (
    <div>
      {paymentInfo ? (
        <div style={{zIndex:"99", padding:"100px",}}>
          <h1>Payment Details</h1>
          <p>Payment ID: {paymentInfo.payment_id}</p>
          <p>Amount: Rs {paymentInfo.amount}</p>
          <p>Products: {paymentInfo.products}</p>
        </div>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
}
