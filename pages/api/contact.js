import User from '../../models/Contact';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
  if (req.method == 'POST') {
    const {name,email,sub,msg} = req.body;
    let u = new User({name,email,sub,msg});
    await  u.save();
    res.status(200).json({ "success": true })
  }
  else {
    res.status(400).json({"success":false, error: "This method is not allowed" })
  }

}

export default connectDb(handler)