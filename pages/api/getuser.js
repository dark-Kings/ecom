import User from '../../models/User'
import connectDb from '../../middleware/mongoose'
import jsonwebtoken from 'jsonwebtoken'


const handler = async (req, res) => {
   if(req.method=="POST"){
    let jwt = req.body.token
    let user = jsonwebtoken.verify(jwt,process.env.NEXT_PUBLIC_JWT_SECRET)
    let dbuser = await User.findOne({email:user.email})
    // console.log(dbuser)
    const {name,email,address,pincode,phone,Uroll}=dbuser
    res.status(200).json({ name,email,address,pincode,phone,Uroll})

   
}else{

       res.status(500).json({ error:error })
   }
   
   
  }
  


  export default connectDb(handler)