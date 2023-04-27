import Order from "../../models/Order"
import connectDb from "../../middleware/mongoose"
 
const handler = async (req, res) => {
     // Validate paytm checksum --[pending]
    //update into orders table after ckecking the transaction satus
    if(req.body.STATUS=='TXN_SUCCESS'){
    await Order.findOneAndUpdate({
      orderId:req.body.orderId}, {status:'Paid',paymentInfo:JSON.stringify(req.body)})
    }
    else if(req.body.STATUS=='PENDING'){
      await Order.findOneAndUpdate({
        orderId:req.body.orderId}, {status:'Pending',paymentInfo:JSON.stringify(req.body)})
    }
    // initiate shipping
    // redirect user to order confirmation page
    
    res.redirect('/order',200)
  
  }
  
  export default connectDb(handler)