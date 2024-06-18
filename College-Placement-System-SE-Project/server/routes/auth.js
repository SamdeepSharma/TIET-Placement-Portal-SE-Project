const express = require('express')
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fetchuser = require('../middleware/fetchuser')
const isAdmin = require('../middleware/isAdmin')
require("dotenv").config()

JWT_SECRET = process.env.JWT_SECRET;

//#ROUTE:1  creating new user by post method, doesn't require login
router.post('/createuser',
     [body('name', 'Enter a valid name').isLength({ min: 3 }),
     body('email', 'Enter a valid email').isEmail(),
     body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
     body('uid', 'User id must be min 9 digits').isLength({ min: 9 }),
     body('role', 'Enter your role (student or admin)').isIn(['student', 'admin']),
     body('gpa').if(body('role').equals('student')).notEmpty().withMessage('GPA is required for students'),
     body('branch').if(body('role').equals('student')).notEmpty().withMessage('Branch is required for students'),
     body('year').if(body('role').equals('student')).notEmpty().withMessage('Year is required for students'),
     body('phone_no').if(body('role').equals('admin')).notEmpty().withMessage('Phone Number is required for admins')

     ], async (req, res) => {
          //If there are errors, return bad request
          const result = validationResult(req);
          let success = false;
          if (!result.isEmpty()) {
               success = false
               return res.json({ success, errors: result.array() });
          }
          try {
               //check if user with the same email exists already
               let user = await User.findOne({ email: req.body.email })
               if (user) {
                    success = false
                    res.status(400).json({ success, error: "Sorry, a user with this email already exists" })
               }

               //check if user with the same uid exists already
               user = await User.findOne({ uid: req.body.uid })
               if (user) {
                    success = false
                    res.status(400).json({ success, error: "Invalid Id" })
               }

               const salt = await bcrypt.genSalt(10)
               const secPass = await bcrypt.hash(req.body.password, salt)
               //Checking role
               if (req.body.role === 'student') {
                    user = await User.create({
                         name: req.body.name,
                         email: req.body.email,
                         password: secPass,
                         uid: req.body.uid,
                         role: req.body.role,
                         gpa: req.body.gpa,
                         year: req.body.year,
                         branch: req.body.branch
                    })
               }
               else if (req.body.role === 'admin') {
                    user = await User.create({
                         name: req.body.name,
                         email: req.body.email,
                         password: secPass,
                         uid: req.body.uid,
                         role: req.body.role,
                         phone_no: req.body.phone_no
                    })
               }

               const data = {
                    user: {
                         id: user.id
                    }
               }
               const authtoken = jwt.sign(data, JWT_SECRET)
               success = true
               res.json({ success, "authtoken": authtoken })
          } catch (error) {
               console.log(error.message)
               // res.status(500).send("Something seems broken!")
          }
     })

//ROUTE: 2  authenticate a user using api/auth/login and creating login endpoint, no login required
router.post('/login', [
     body('email', 'Enter a valid email').isEmail(),
     body('password', 'Password must be atleast 8 characters').exists()
], async (req, res) => {
     const result = validationResult(req);
     let success = false;
     if (!result.isEmpty()) {
          return res.json({ success, errors: result.array() });
     }
     const { email, password } = req.body;

     try {
          //check if user with the same email exists already
          let user = await User.findOne({ email })
          if (!user) {
               success = false
               res.status(400).json({ success, error: "Email and Password combination does not match" })
          }

          const passwordCompare = await bcrypt.compare(password, user.password)
          if (!passwordCompare) {
               success = false
               return res.status(400).json({ success, error: "Email and Password combination does not match" })
          }

          const data = {
               user: {
                    id: user.id
               }
          }
          const authtoken = jwt.sign(data, JWT_SECRET)
          success = true
          const person = await User.findOne({ email })
          res.json({ "user": person.role, success, "authtoken": authtoken })
     } catch (error) {
          console.log(error.message)
          // res.status(500).send("Opps! Something seems broken.")
     }
})

//ROUTE: 3  To get logged in user's details using api/auth/getdata, login required
router.get('/getdata', fetchuser, async (req, res) => {
     try {
          const userId = req.user.id
          const user = await User.findById(userId).select("-password")
          res.send(user)
     }
     catch (error) {
          console.log(error.message)
          res.status(500).send("Internal Server Error")
     }
})

//ROUTE: 4  To get students list and their details using api/auth/getstudents, login required
router.get('/getstudents', fetchuser, isAdmin, async (req, res) => {
     try {
          const users = await User.find({ role: "student" }).select("-password")
          res.send(users)
     }
     catch (error) {
          console.log(error.message)
          res.status(500).send("Internal Server Error")
     }
})

module.exports = router