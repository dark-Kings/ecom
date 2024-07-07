// import User from '../../models/Contact';
// import connectDb from '../../middleware/mongoose';
import Order from "../../models/Order"
import pincodes from '../../pincodes.json'
import Product from "../../models/Product"
import connectDb from '../../middleware/mongoose';
import Stripe from 'stripe'
const stripe = new Stripe('sk_test_51N7hl3SHBE45jscN5AtjXTUNJacUegzFPTJHZeSglVfIhi8Vn6ek02Mf11CQoA3TCv0lnLaf1HdNIuCyYGzAo16Z00SRKVA0bE');

const handler = async (req, res) => {
  if (req.method == 'POST') {
    if(!Object.keys(pincodes).includes(req.body.pincode)){
      res.status(200).json({success:false,cartClear:false,'error':"This pincode you have entered is not serviceable"})
      return
    }


    // check if cart is tampered with -
    let products, sumTotal=0
   
     if(req.body.subTotal<=0){
      res.status(200).json({success:false,cartClear:false,'error':"Cart is empty. Please build your cart and try again"})
      return
     }

    for(let item in req.body.cart){
      sumTotal+=req.body.cart[item].price*req.body.cart[item].qty
      products= await Product.findOne({slug:item})
      // check if the cart items are out of stocks --[pending]
     if(products.availableQty<req.body.cart[item].qty) {
      res.status(200).json({success:false,cartClear:true,'error':"Some item in your cart went out of stock. Please try again"})
      return
     }
    if( products.price!= req.body.cart[item].price){
      res.status(200).json({success:false,cartClear:true,'error':"The price of some item in your cart have changed. Please try again"})
      return
    }
  }
    if(sumTotal != req.body.subTotal){
      res.status(200).json({success:false,cartClear:true,'error':"The price of some item in your cart have changed. Please try again"})
      return
    }

    // check if the details are valid --
      if(req.body.phone.length !==10 || !Number.isInteger(Number(req.body.phone))){
        res.status(200).json({success:false,cartClear:false,'error':"Please enter your 10 digit phone number and try again"})
        return
      }
      if(req.body.pincode.length !==6 || !Number.isInteger(Number(req.body.pincode))){
        res.status(200).json({success:false,cartClear:false,'error':"Please enter your 6 digit pincode and try again"})
        return
      }

      let order = new Order({
        email:req.body.email,
        name:req.body.name,
        orderId:req.body.Oid,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        pincode:req.body.pincode,
        phone:req.body.phone,
        amount:req.body.subTotal,
        products:req.body.cart
    })
    await order.save()




    const { cart } = req.body;

    const pro = cart
    
    // Calculate total price
    // let total = 0;
    // for (const key in pro) {
    //   if (pro.hasOwnProperty(key)) {
    //     total += pro[key].qty * pro[key].price;
    //   }
    // }
    
    // const totalInCents = total * 100;
    
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
      cancel_url: `${process.env.NEXT_PUBLIC_HOST}`, // Redirect URL if the payment is canceled
    });
    

  //  console.log(session.id)
    res.json({ id: session.id });


  }
  else {
    res.status(400).json({"success":false, error: "This method is not allowed" })
  }

}

export default connectDb(handler)
