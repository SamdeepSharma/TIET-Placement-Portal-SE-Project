const express = require('express')
const router = express.Router()
const Job = require("../models/Job")
const User = require("../models/User")
const fetchuser = require('../middleware/fetchuser')
const isAdmin = require('../middleware/isAdmin')
const isStudent = require('../middleware/isStudent')
const Application = require('../models/Application')
const { validationResult } = require('express-validator');

const dateconvert= (timestamp) => {
     // Convert the timestamp string to a number
     const timestampNumber = parseInt(timestamp);
     // Create a Date object using the timestamp
     const date = new Date(timestampNumber);
     // Format the date as desired
     return formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
}

//ROUTE:1 GET all applications using /api/applications/fetchapplications, login required
router.get('/fetchapplications', fetchuser, isStudent, async (req, res) => {
     try {
          const application = await Application.find({ user: req.user.id })
          const info= application.map( async(app)=> {
               const user = await User.findById(app.user).select("-password")
               const company = await Job.findById(app.company)
               const currdate = dateconvert(app.date)
               return {aid: app._id, userid: user.uid, username: user.name, companyname: company.companyName, type: company.type, applydate: currdate, status: app.status}
          })
          const data = await Promise.all(info)
          return res.json(data);
     }
     catch (error) {
          console.log(error.message)
          return res.status(500).send("Internal Server Error")
     }
})

//ROUTE:2 GET all applications using /api/applications/fetchall, login required
router.get('/fetchall', fetchuser, isAdmin, async (req, res) => {
     try {
          const application = await Application.find()
          const info= application.map( async(app)=> {
               const user = await User.findById(app.user).select("-password")
               console.log(user)
               const company = await Job.findById(app.company)
               const currdate = dateconvert(app.date)
               return {aid: app._id, userid: user.uid, username: user.name, companyname: company.companyName, type: company.type, applydate: currdate, status: app.status}
          })
          const data = await Promise.all(info)
          return res.json(data);
     }
     catch (error) {
          console.log(error.message)
          return res.status(500).send("Internal Server Error")
     }
})

//ROUTE:3 add applications using /api/application/addapplication, login required
router.post('/submitapplications/:id', fetchuser, isStudent, async (req, res) => {
     try {
          //If there are errors, return bad request
          const result = validationResult(req);
          if (!result.isEmpty()) {
               return res.json({ errors: result.array() });
          }

          let success = false;
          let job = await Job.findById(req.params.id)

          const check = await Application.findOne({ user: req.user.id, company: job._id })
          if (check) { return res.status(400).json({ success, error: "Already applied!" }) }

          const application = new Application({
               user: req.user.id, company: job._id
          })

          success = true;
          const savedapplication = await application.save()
          return res.json({ success, savedapplication })
     }
     catch (error) {
          console.log(error.message)
          return res.status(500).send("Internal Server Error")
     }
})

//ROUTE:4 add applications using /api/application/addapplication, login required
router.get('/checkapplications/:id', fetchuser, isStudent, async (req, res) => {
     try {
          //If there are errors, return bad request
          const result = validationResult(req);
          if (!result.isEmpty()) {
               return res.json({ errors: result.array() });
          }

          let success = false;
          let job = await Job.findById(req.params.id)

          const check = await Application.findOne({ user: req.user.id, company: job._id })
          if (check) { return res.json(success) }
          else {
               success = true
               return res.json(success)}
     }
     catch (error) {
          console.log(error.message)
          return res.status(500).send("Internal Server Error")
     }
})

//ROUTE:5 update status using /api/application/updatestatus, login required
router.put('/updatestatus/:id', fetchuser, isAdmin, async (req, res) => {
     try {
          const { status } = req.body;
          //Create a newapplication object
          const newApplication = {}
          if (status === 'applied' || status === 'submitted' || status === 'selected' || status === 'rejected') { newApplication.status = status }
          else {return res.status(400).json({"error": "Status must be applied, submitted, selected or rejected"})}

          //find the application to be updated and update it
          let application = await Application.findById(req.params.id)
          if (!application) { return res.status(404).send("Not Found") }

          //updating the particular application
          application = await Application.findByIdAndUpdate(req.params.id, { $set: newApplication }, { new: true })
          return res.json({ application })
     }
     catch (error) {
          console.log(error.message)
          return res.status(500).send("Internal Server Error")
     }
})

module.exports = router