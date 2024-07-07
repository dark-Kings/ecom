const mongoose = require('mongoose')

const SubscribeSchema = new mongoose.Schema({
    email: {type: String, required:true}
},{timestamps: true});

mongoose.models = {}
export default mongoose.model('subscribe',SubscribeSchema)