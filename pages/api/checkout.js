// import User from '../../models/Contact';
// import connectDb from '../../middleware/mongoose';
import connectDb from '../../middleware/mongoose';
import Stripe from 'stripe'
const stripe = new Stripe('sk_test_51N7hl3SHBE45jscN5AtjXTUNJacUegzFPTJHZeSglVfIhi8Vn6ek02Mf11CQoA3TCv0lnLaf1HdNIuCyYGzAo16Z00SRKVA0bE');

const handler = async (req, res) => {
  if (req.method == 'POST') {
    const { product } = req.body;

    const pro = product
    
    // Calculate total price
    let total = 0;
    for (const key in pro) {
      if (pro.hasOwnProperty(key)) {
        total += pro[key].qty * pro[key].price;
      }
    }
    
    const totalInCents = total * 100;
    
    const lineItems = [];
    for (const key in pro) {
      if (pro.hasOwnProperty(key)) {
        lineItems.push({
          price_data: {
            currency: 'inr',
            product_data: {
              name: pro[key].name,
            },
            unit_amount: pro[key].price * 100,
          },
          quantity: pro[key].qty,
        });
      }
    }
    
    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_HOST}`, // Redirect URL after successful payment
      cancel_url: `${process.env.NEXT_PUBLIC_HOST}/`, // Redirect URL if the payment is canceled
    });
    
  //  console.log(session.id)
    res.json({ id: session.id });


  }
  else {
    res.status(400).json({"success":false, error: "This method is not allowed" })
  }

}

export default connectDb(handler)
