const mongoose = require('mongoose')
const {Schema} = mongoose

const AnnounceSchema = new Schema({
     user:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
     },
     title:{
          type: String,
          required: true
     },
     description:{
          type: String,
          required: true,
     },
     date:{
          type: String,
          default: Date.now
     },
});

module.exports = mongoose.model('announce', AnnounceSchema)