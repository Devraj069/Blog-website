const express= require('express')
const mongoose = require('mongoose')
const User = require("./models/User")
const userRoutes = require("./routes/authRoutes")
require("dotenv").config();
const app=express()

const URI=process.env.MONGO_URI;

app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}));

mongoose.connect(URI).then(()=>{
console.log("DB Connected")
}).catch((error)=>{
   console.log("Database Failed"+error.message)
})

//routes
app.use("/auth",userRoutes)


app.listen(process.env.PORT,()=>{
    console.log("Server Started")
})





