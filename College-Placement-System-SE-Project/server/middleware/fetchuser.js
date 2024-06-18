const jwt = require("jsonwebtoken")
require("dotenv").config()

JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req,res,next) =>{
     //Get the user from jwt token and add id to req object
     const token = req.header('auth-token')
     if(!token)
     {
          return res.status(401).send({error: "Please authenticate using a valid token"})
     }
     try{
          const data = jwt.verify(token, JWT_SECRET);
          req.user = data.user;
          next();
     }
     catch(error)
     {
          return res.status(401).send({error: "Please authenticate using a valid token"})
     }
}

module.exports = fetchuser