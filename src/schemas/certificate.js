const mongoose  = require('mongoose')


const certificateSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  downloads: {
    type: Number
  }
}, { timestamps: true });


module.exports = mongoose.model("Certificate", certificateSchema)