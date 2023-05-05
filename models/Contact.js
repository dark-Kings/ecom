const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    sub: { type: String, default:"" },
    msg: { type: String, required:true }
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Contact", ContactSchema);
