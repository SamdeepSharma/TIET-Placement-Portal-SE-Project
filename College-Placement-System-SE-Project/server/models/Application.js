const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Application schema
const applicationSchema = new Schema({
     user:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
     },
     company:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'job'
     },
     date:{
          type: String,
          default: Date.now
     },
     status: {
          type: String,
          default : 'applied',
          enum: ['applied', 'submitted', 'selected', 'rejected'] 
      }
});

// Create and export Application model based on schema
const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;