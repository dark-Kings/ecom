import Forgot from "../../models/Forgot"

import connectDb from '../../middleware/mongoose';


const  handler = async (req, res)=>{
   
    //Check if the user exists in the DB

    let token = `aljl;aj;lajdfkldjljfdslfjkdjjsflafjal;`
    let forgot = new Forgot({email:req.body.email})


    let email =   `We have sent you this email in response to your request to reset your password on CodesWear.com.

    To reset your password, please follow the link below:

    <a href="http//codeswear.com/Forgot?token=${token}">Click here to reset your Password</a>

   

    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your  My Account Page and change your Password `

    res.status(200).json({ name: 'John Doe' })
  }

  export default connectDb(handler)
  