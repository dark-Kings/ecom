import Product from '../../models/Product';
import connectDb from '../../middleware/mongoose';


const handler = async (req, res) => {
  if (req.method == 'POST') {
    
     const {slug}=req.body
    //  console.log(slug)

      await Product.findOneAndDelete(slug)


    res.status(200).json({ success: true})
}
else {
    req.status(400).json({success:false})
}
}


export default connectDb(handler)