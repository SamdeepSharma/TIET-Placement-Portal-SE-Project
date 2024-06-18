const bodyParser = require('body-parser');
const express = require('express')
const connectToDB = require('./db');
const cors = require('cors')
const app = express() 

connectToDB();

const allowedOrigins = [
  'https://tiet-placement-portal-se-project.vercel.app', // Frontend URL 1
  'http://localhost:5173', // Frontend URL 2
];

app.use(cors({
  origin: (origin, callback) => {
    // Check if the request origin is in the allowedOrigins array
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the request
    }
  }
}));

const port = 5000

app.use(bodyParser.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/announcements', require('./routes/announcements'))
app.use('/api/jobs', require('./routes/jobs'))
app.use('/api/applications', require('./routes/applications'))
app.use('/api/contact-form', require('./routes/contact'))
app.use('/', (req,res)=>{
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`TIET-PMS is up and running`)
})