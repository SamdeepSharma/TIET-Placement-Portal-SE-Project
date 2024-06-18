const mongoose = require('mongoose')
require("dotenv").config()

const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
if(!username) {console.log('undefined')}
const uri = `mongodb+srv://${username}:${password}@cluster0.y0nvrhh.mongodb.net/pms`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectToDB = async() =>{
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

module.exports = connectToDB;