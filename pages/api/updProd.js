import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose';


const handler = async (req, res) => {
  if (req.method == 'POST') {
    
     const {img,price,availableQty,desc,Sslug}=req.body
    //  console.log(Sslug)

      await Product.findOneAndUpdate({slug:Sslug},{availableQty :availableQty,img:img,price:price,desc:desc})


    res.status(200).json({ success: true})
}
else {
    req.status(400).json({success:false})
}
}


export default connectDb(handler)