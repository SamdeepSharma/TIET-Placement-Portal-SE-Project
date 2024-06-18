const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../models/User")

JWT_SECRET = process.env.JWT_SECRET;

const isAdmin = async (req, res, next) => {
     const token = req.header('auth-token')
     if (!token) {
          return res.status(401).send({ error: "Please authenticate using a valid token" })
     }
     const data = jwt.verify(token, JWT_SECRET);
     const userId = data.user;
     const user = await User.findById(userId.id).select("role")
     if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
     if (user.role === 'admin') {
          // User is an admin, proceed to next middleware or route handler
          next();
     } else {
          // User is not an admin, respond with 403 Forbidden
          return res.status(403).json({ error: 'Unauthorized access. Admin privileges required.' });
     }
};

module.exports = isAdmin;