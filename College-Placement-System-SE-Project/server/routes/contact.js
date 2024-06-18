const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')

router.post('/submit', async (req, res) => {
     try {
          const { email, feedback, name, phone } = req.body;
          //If there are errors, return bad request
          const contact = new Contact({
               email, feedback, name, phone
          })
          const saveddata = await contact.save()
          console.log(saveddata)
          return res.json(saveddata)
     }
     catch (error) {
          console.log(error.message)
          return res.status(500).send("Internal Server Error")
     }
})

module.exports = router