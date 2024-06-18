const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define JobPosting schema
const jobPostingSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
   },
     date:{
          type: String,
          default: Date.now
     },
    type: {
        type: String,
        enum: ['job', 'internship'],
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    closingDate: {
        type: Date,
        required: true
    },
    requiredGPA: {
        type: Number,
        required: true,
        min: 0,
        max: 10.0 // Assuming GPA is on a scale of 0 to 10.0
    },
    batch: {
        type: Number,
        required: true,
        min: 2024,
        max: 2027
    }
});

// Create and export JobPosting model based on schema
const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;