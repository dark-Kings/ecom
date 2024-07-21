// Import necessary modules
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51N7hl3SHBE45jscN5AtjXTUNJacUegzFPTJHZeSglVfIhi8Vn6ek02Mf11CQoA3TCv0lnLaf1HdNIuCyYGzAo16Z00SRKVA0bE");

// Handler function for the API route
export default async function handler(req, res) {
  const { session_id } = req.query; // Retrieve session_id from query parameters

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const paymentDetails = {
      payment_id: session.payment_intent,
      amount: session.amount_total/100,
      products : session.metadata.products_details,
    };

    res.status(200).json(paymentDetails);
  } catch (error) {
    console.error('Error retrieving payment details from Stripe:', error.message);
    res.status(500).json({ error: 'Failed to retrieve payment details' });
  }
}
