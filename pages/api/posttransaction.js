import Order from "../../models/Order"
import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"
const checksum_lib = require('paytmchecksum')
 
const handler = async (req, res) => {
  let order
     // Validate paytm checksum run when you have mid and mkey of paytm
      
    //  var paytmChecksum="";
    //  var paytmParams = {}

    //  const received_data= req.body
    //  for(var key in received_data){
    //   if(key = "CHECKSUMHASH"){
    //     paytmChecksum= received_data[key]
    //   }
    //   else{
    //     paytmParams[key]=received_data[key]
    //   }
    //  }

    //  var isValidChecksum = checksum_lib.verifySignature(paytmParams,process.env.NEXT_PUBLIC_PAYTM_MID,paytmChecksum)
    //   if(!isValidChecksum){
    //     console.log("checksum not matched")
    //     res.status(500).send("Some error Occered")
    //     return
    //   }
     
     


    //update into orders table after ckecking the transaction satus
    if(req.body.STATUS=='TXN_SUCCESS'){
    order = await Order.findOneAndUpdate({
      orderId:req.body.orderId}, {status:'Paid',paymentInfo:JSON.stringify(req.body), transactionid:req.body.txnId})
     let products = order.products
     for(let slug in products){
       const b= JSON.parse(products[slug].qty)
       let a = await Product.findOneAndUpdate({slug:slug},{$inc  :{availableQty :-b}})
      }

    
    }
    else if(req.body.STATUS=='PENDING'){
      order = await Order.findOneAndUpdate({
        orderId:req.body.orderId}, {status:'Pending',paymentInfo:JSON.stringify(req.body)})
    
      }
    // initiate shipping
    // redirect user to order confirmation page

    res.json('/Order?id=' + order._id+'&clearCart=1')
  
  }
  
  export default connectDb(handler)