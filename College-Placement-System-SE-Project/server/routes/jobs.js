const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const isAdmin = require('../middleware/isAdmin')
const Job = require('../models/Job')
const { body, validationResult } = require('express-validator');

//ROUTE:1 GET all jobs using /api/jobs/fetchjobs, login required
router.get('/fetchjobs', fetchuser, async (req, res) => {
     try {
          const job = await Job.find()
          return res.json(job)
     }
     catch (error) {
          console.log(error.message)
          return res.status(500).send("Internal Server Error")
     }
})

//ROUTE:2 add jobs using /api/job/addjob, login required
router.post('/addjobs', fetchuser, isAdmin, [
     body('type', 'Type must be either "job" or "internship"').isIn(['job', 'internship']),
     body('companyName', 'Company name is required').notEmpty(),
     body('closingDate', 'Closing date is required and must be a valid date').isISO8601().toDate(),
     body('requiredGPA', 'GPA must be a number between 0 and 10').isFloat({ min: 1, max: 10 }),
     body('batch', 'Batch must be from 2024 to 2027').isInt({ min: 2024, max: 2027 })
], async (req, res) => {
     try {
          const { type, companyName, closingDate, requiredGPA, batch } = req.body;
          //If there are errors, return bad request
          const result = validationResult(req);
          if (!result.isEmpty()) {
               return res.json({ errors: result.array() });
          }
          const job = new Job({
               type, companyName, closingDate, requiredGPA, batch, user: req.user.id
          })

          const savedjob = await job.save()
          return res.json(savedjob)
     }
     catch (error) {
          console.log(error.message)
          return res.status(500).send("Internal Server Error")
     }
})

//ROUTE:3 delete jobs using /api/job/deletejob, login required
router.delete('/deletejobs/:id', fetchuser, isAdmin, async (req, res) => {
     try {
          //find the job to be deleted and delete it
          let job = await Job.findById(req.params.id)
          if (!job) { return res.status(404).send("Not Found") }

          //deleting the particular job
          job = await Job.findByIdAndDelete(req.params.id)
          return res.json({ "Success": "the job has been deleted", "id": req.user.id })
     }
     catch (error) {
          console.log(error.message)
          return res.status(500).send("Internal Server Error")
     }
})
module.exports = router