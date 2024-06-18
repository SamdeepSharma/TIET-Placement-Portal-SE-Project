const mongoose = require('mongoose')
const { Schema } = mongoose

const options = { discriminatorKey: 'role' };

const UserSchema = new Schema({
     name: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true,
          unique: true
     },
     password: {
          type: String,
          required: true
     },
     date: {
          type: String,
          default: Date.now
     },
     uid: {
          type: String,
          required: true,
          unique: true
     },
     role: {
          type: String,
          enum: ['student', 'admin'],
          required: true
     }
}, options);

// Student Schema (inherits from User)
const studentSchema = new Schema({
     gpa: {
          type: String,
          required: true,
          min: 0,
          max: 10.0
     },
     branch: {
          type: String,
          required: true
     },
     year: {
          type: String,
          required: true
     }
}, options);

// Admin Schema (inherits from User)
const adminSchema = new Schema({
     phone_no: {
          type: String,
          required: true,
     }
}, options);

// Register the Discriminators
const User = mongoose.model('User', UserSchema);
User.discriminator('student', studentSchema);
User.discriminator('admin', adminSchema);

module.exports = mongoose.model('user', UserSchema)