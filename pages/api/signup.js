import User from '../../models/User';
import connectDb from '../../middleware/mongoose';
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == 'POST') {
    const {name,email} = req.body;
    console.log(req.body)
    let u = new User({name,email,password:CryptoJS.AES.encrypt(req.body.password,`${process.env.NEXT_PUBLIC_AES_SECRET}`).toString()});
    await  u.save();
    res.status(200).json({ "success": true })
  }
  else {
    res.status(400).json({"sucess":false, error: "This method is not allowed" })
  }

}

export default connectDb(handler)