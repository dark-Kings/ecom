import Forgot from "../../models/Forgot"
import User from "../../models/User"
import connectDb from '../../middleware/mongoose';
var CryptoJS = require("crypto-js");



const handler = async (req, res) => {



    if (req.body.sendMail) {
        //Check if the user exists in the DB
        let tempUser = await User.findOne({ email: req.body.email })
       
        if (tempUser) {
            let token = Math.floor(Math.random() * Date.now())
            let Lforgot = new Forgot({email:req.body.email,token})
            await Lforgot.save()


            let emails = `We have sent you this email in response to your request to reset your password on CodesWear.com.
    To reset your password, please follow the link below:
    <a href="http://localhost:3000//Forgot?token=${token}">Click here to reset your Password</a>
    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your  My Account Page and change your Password `

    res.status(200).json({ success: true,emails,name:tempUser.name })

        }
        else {
            res.status(200).json({ success: false })
        }
    }
    else {
        // Reset User Password
        const temp2user = await Forgot.findOne({token:req.body.tokens})
        if(temp2user){
        await User.findOneAndUpdate({ email: temp2user.email }, { password: CryptoJS.AES.encrypt(req.body.password, `${process.env.NEXT_PUBLIC_AES_SECRET}`).toString() })
        await Forgot.findOneAndDelete({token:req.body.tokens})
        res.status(200).json({ success: true })
        return
        }
        else{
        res.status(200).json({ success: false })

        }
    }

}

export default connectDb(handler)
