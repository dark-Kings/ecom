import Subscribe from '../../models/Subscribe';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
  if (req.method == 'POST') {
    const {email} = req.body;
    let u = new Subscribe({email});
    await  u.save();
    res.status(200).json({ "success": true })
  }
  else {
    res.status(400).json({"sucess":false, error: "This method is not allowed" })
  }
}

export default connectDb(handler)