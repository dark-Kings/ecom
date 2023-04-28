import Order from "../../models/Order"
import connectDb from "../../middleware/mongoose"
 
const handler = async (req, res) => {
     // Validate paytm checksum --[pending]
    //update into orders table after ckecking the transaction satus
    let order
    if(req.body.STATUS=='TXN_SUCCESS'){
    order = await Order.findOneAndUpdate({
      orderId:req.body.orderId}, {status:'Paid',paymentInfo:JSON.stringify(req.body)})
      const id=order._id
      const rid =JSON.parse(JSON.stringify(id))

    
    }
    else if(req.body.STATUS=='PENDING'){
      order = await Order.findOneAndUpdate({
        orderId:req.body.orderId}, {status:'Pending',paymentInfo:JSON.stringify(req.body)})
    
      }
    // initiate shipping
    // redirect user to order confirmation page
    // console.log("/Order?id="+order._id)
    // res.redirect(`/Order?id=` + order._id,200)
    res.json(`/Order?id=` + order._id)
  
  }
  
  export default connectDb(handler)