import User from '../../models/User'
import connectDb from '../../middleware/mongoose'
import jsonwebtoken from 'jsonwebtoken'
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
   if(req.method=="POST"){
    let jwt = req.body.token
    let user = jsonwebtoken.verify(jwt,process.env.NEXT_PUBLIC_JWT_SECRET)
    let dbuser = await User.findOne({email:user.email})

    const bytes = CryptoJS.AES.decrypt(dbuser.password,`${process.env.NEXT_PUBLIC_AES_SECRET}`);
    let decryptedData = (bytes.toString(CryptoJS.enc.Utf8));

    if(decryptedData == req.body.password && req.body.npassword == req.body.cpassword){
    await User.findOneAndUpdate({email:dbuser.email},{password:CryptoJS.AES.encrypt(req.body.npassword,`${process.env.NEXT_PUBLIC_AES_SECRET}`).toString()})
    res.status(200).json({ success:true})
    return
    }
    else{
    res.status(500).json({ success:false})
    return

    }
   
}else{

       res.status(500).json({ error:error })
       return
   }
   
   
  }
  


  export default connectDb(handler)