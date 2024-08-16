// Import necessary modules
import Stripe from 'stripe';
import Order from "../../models/Order"
import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const stripe = new Stripe("sk_test_51N0MJISHiqiqoYUqhFOFwxnIuLhY6Ni8hONxBt0bo4pN22ivrzRzfKENb9oVtz477iVDpewhVNS4sD1Q6A9cow3m00cAoK4nj1");

// Handler function for the API route
const handler = async (req, res) => {
  const { session_id } = req.query; // Retrieve session_id from query parameters

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const paymentDetails = {
      transactionid: session.payment_intent,
      amount: session.amount_total / 100,
      order: JSON.parse(session.metadata.products_details),
      status: session.payment_status,
      paymentInfo: JSON.stringify(session.customer_details, session.metadata.products_details, session.payment_intent, session.payment_status, session.payment_method_types)
    };

    const orderDetail = {
      email: paymentDetails.order.email,
      name: paymentDetails.order.name,
      orderId: paymentDetails.order.orderId,
      paymentInfo: paymentDetails.paymentInfo,
      products: paymentDetails.order.products,
      address: paymentDetails.order.address,
      city: paymentDetails.order.city,
      pincode: paymentDetails.order.pincode,
      state: paymentDetails.order.state,
      phone: paymentDetails.order.phone,
      transactionid: paymentDetails.transactionid,
      amount: paymentDetails.amount,
      status: paymentDetails.status,
    }
    const existingOrder = await Order.findOne({ orderId: paymentDetails.order.orderId });

    if (existingOrder) {
      return res.status(200).json({ orderDetail: existingOrder, clearCart: 0 });
    }

    let order = new Order(orderDetail)
    await order.save()
    let products = orderDetail.products
    for (let slug in products) {
      const b = products[slug].qty
      console.log(b)
      let a = await Product.findOneAndUpdate({ slug: slug }, { $inc: { availableQty: -b } })
      // console.log(a)
    }

    const orderSave = await Order.findOne({ orderId: paymentDetails.order.orderId });

    res.status(200).json({ orderDetail: orderSave, clearCart: 1 });
  } catch (error) {
    console.error('Error retrieving payment details from Stripe:', error.message);
    res.status(500).json({ error: 'Failed to retrieve payment details' });
  }
}

export default connectDb(handler)