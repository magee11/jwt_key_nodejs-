const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/user')
const app = express();
const dotenv = require('dotenv');
dotenv.config()
Port = 3000

const database = process.env.MONGOLAB_URI
mongoose.set('strictQuery',false)
mongoose.connect(database)
.then(() => {console.log("Mongodb Connected")})
.catch(err => {console.log(err)});
app.use(express.json())
app.use('/',require('./routes/register'))


app.listen(Port,()=>{console.log(`Runnig in Port${Port}`)})