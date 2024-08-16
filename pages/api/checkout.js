import pincodes from '../../pincodes.json'
import Product from "../../models/Product"
import Stripe from 'stripe'

const stripe = new Stripe("sk_test_51N0MJISHiqiqoYUqhFOFwxnIuLhY6Ni8hONxBt0bo4pN22ivrzRzfKENb9oVtz477iVDpewhVNS4sD1Q6A9cow3m00cAoK4nj1");
// const stripe = new Stripe(`${process.env.STRIPE_SK}`);

const handler = async (req, res) => {
  if (req.method == 'POST') {
    if (!Object.keys(pincodes).includes(req.body.pincode)) {
      res.status(200).json({ success: false, cartClear: false, 'error': "This pincode you have entered is not serviceable" })
      return
    }


    // check if cart is tampered with -
    let products, sumTotal = 0

    if (req.body.subTotal <= 0) {
      res.status(200).json({ success: false, cartClear: false, 'error': "Cart is empty. Please build your cart and try again" })
      return
    }

    for (let item in req.body.cart) {
      sumTotal += req.body.cart[item].price * req.body.cart[item].qty
      products = await Product.findOne({ slug: item })
      // check if the cart items are out of stocks --[pending]
      if (products.availableQty < req.body.cart[item].qty) {
        res.status(200).json({ success: false, cartClear: true, 'error': "Some item in your cart went out of stock. Please try again" })
        return
      }
      if (products.price != req.body.cart[item].price) {
        res.status(200).json({ success: false, cartClear: true, 'error': "The price of some item in your cart have changed. Please try again" })
        return
      }
    }
    if (sumTotal != req.body.subTotal) {
      res.status(200).json({ success: false, cartClear: true, 'error': "The price of some item in your cart have changed. Please try again" })
      return
    }

    // check if the details are valid --
    if (req.body.phone.length !== 10 || !Number.isInteger(Number(req.body.phone))) {
      res.status(200).json({ success: false, cartClear: false, 'error': "Please enter your 10 digit phone number and try again" })
      return
    }
    if (req.body.pincode.length !== 6 || !Number.isInteger(Number(req.body.pincode))) {
      res.status(200).json({ success: false, cartClear: false, 'error': "Please enter your 6 digit pincode and try again" })
      return
    }
    let orderDetail = {
      email: req.body.email,
      orderId: req.body.Oid,
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      phone: req.body.phone,
      products: req.body.cart
    }
    // let order = new Order(a)
    // console.log(order)
    // await order.save()

    const { cart } = req.body;

    const lineItems = [];
    for (const key in cart) {
      if (cart.hasOwnProperty(key)) {
        lineItems.push({
          price_data: {
            // currency: 'usd',
            currency: 'inr',
            product_data: {
              name: cart[key].name,
            },
            unit_amount: cart[key].price * 100,
          },
          quantity: cart[key].qty,
        });
      }
    }

    // Convert lineItems to a string representation
    // const products_details = lineItems.map(item => `${item.quantity} ${item.price_data.unit_amount / 100} ${item.price_data.product_data.name}`).join(', ');
    const products_details = JSON.stringify(orderDetail)

    // console.log(products_details);

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      billing_address_collection: 'required', // Specify billing address collection
      metadata: {
        products_details: products_details,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_HOST}/payment-details?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_HOST}/Checkout`,
    });

    // console.log(session)

    res.status(200).json({ sessionId: session.id, products_details: lineItems });

  }
  else {
    res.status(400).json({ "success": false, error: "This method is not allowed" })
  }

}

export default handler
