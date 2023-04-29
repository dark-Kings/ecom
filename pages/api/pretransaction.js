import Order from "../../models/Order"
import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"
import pincodes from '../../pincodes.json'
const https = require('https');
const PaytmChecksum = require('paytmchecksum');


const handler = async (req, res) => {
  if(req.method==='POST'){
    
    // check if the pincode is serviceable
    if(!Object.keys(pincodes).includes(req.body.pincode)){
      res.status(200).json({success:false,cartClear:false,'error':"This pincode you have entered is not serviceable"})
      return
    }


    // check if cart is tampered with -
    let product,sumTotal=0
   
     if(req.body.subTotal<=0){
      res.status(200).json({success:false,cartClear:false,'error':"Cart is empty. Please build your cart and try again"})
      return
     }

    for(let item in req.body.cart){
      sumTotal+=req.body.cart[item].price*req.body.cart[item].qty
      product= await Product.findOne({slug:item})
      // check if the cart items are out of stocks --[pending]
     if(product.availableQty<req.body.cart[item].qty) {
      res.status(200).json({success:false,cartClear:true,'error':"Some item in your cart went out of stock. Please try again"})
      return
     }
    if( product.price!= req.body.cart[item].price){
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

    
        // intitiate an order   corresponding to this order id
        
        let order = new Order({
           email:req.body.email,
           orderId:req.body.Oid,
           address:req.body.address,
           amount:req.body.subTotal,
           products:req.body.cart
       })
       await order.save()

    // insert an entry in the orders table with status as pending



    // using mid below code can work 

//     var paytmParams = {};

//     paytmParams.body = {
//         "requestType": "Payment",
//         "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
//         "websiteName": "YOUR_WEBSITE_NAME",
//         "orderId": req.body.Oid,
//         "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction` ,
//         "txnAmount": {
//             "value": req.body.subTotal,
//             "currency": "INR",
//         },
//         "userInfo": {
//             "custId":req.body.email,
//         },
//     };


//    const checksum = await  PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY) 

//         paytmParams.head = {
//             "signature": checksum
//         };

//         var post_data = JSON.stringify(paytmParams);

//       const requestAsync = async ()=>{
//          return new Promise((resolve,rejects)=>{
//             var options = {


//                 hostname: process.env.NEXT_PUBLIC_PAYTM_HOST,
    
    
//                 port: 443,
//                 path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.Oid}`,
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Content-Length': post_data.length
//                 }
//             };
    
//             var response = "";
//             var post_req = https.request(options, function (post_res) {
//                 post_res.on('data', function (chunk) {
//                     response += chunk;
//                 });
    
//                 post_res.on('end', function () {
//                     console.log('Response: ', response);
//                      response.success = true
//                     resolve(JSON.parse(response).body)
//                 });
//             });
    
//             post_req.write(post_data);
//             post_req.end();
//          })
//       }
    
//        let myr = await requestAsync()
    //    res.status(200).json(myr)

    const ORDERID = req.body.Oid
    const subTotal = req.body.subTotal
    const txid =Math.floor(Math.random()*Date.now());
    const  paymentInfo= {
        "txnId": txid,
        "bankTxnId": "345jlaj",
        "orderId": ORDERID,
        "txnAmount": subTotal,
        "txnType": "SALE",
        "gatewayName": "HDFC",
        "bankName": "HSBC",
        "mid": "ajfklajfaf34342",
        "paymentMode": "CC",
        "refundAmt": "100.00",
        "txnDate": Date.now(),
        "authRefId": "50112883",
        "STATUS" :"TXN_SUCCESS"

    }
    const data = paymentInfo
    const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data),
      })
      const b= await a.json()
    //   console.log(b)
      res.status(200).json({  "txnToken": "fe795335ed3049c78a57271075f2199e1526969112097",b,success:true,cartClear:false })
    
 }
}

export default connectDb(handler)