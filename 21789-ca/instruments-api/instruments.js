const mongoose = require('mongoose')
const {Schema} = mongoose;
const instrumentSchema = new Schema({
   
    model: String,
    stringsnumber: Number,
    typlength: String,
    commontuning: String,
    available: Boolean
})

const Instruments = mongoose.model('Instruments', instrumentSchema);
module.exports = Instruments