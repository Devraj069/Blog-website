const express= require('express')
const mongoose = require('mongoose')
const User = require("./models/User")
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
app.get("/auth/login",(req,res)=>{
    res.render("login")
})
app.get("/auth/register",(req,res)=>{
    res.render("register")
})

app.post("/login",async (req,res)=>{
    const {username , password}=req.body;
    try{
        const user = await User.findOne({username:username})
        const isMatch = await User.findOne({password})
        if(user && isMatch){
            res.send("Login Successfull")
        } else{
            res.send("Invalid Details")
        }
    }
    catch(error){
            console.log(error)
    }
})
app.post("/register",async (req,res)=>{
    const {username,email,password}=req.body;
    try{
        const user = await User.findOne({email:email});
        if(user){
            res.send("User Exits")
        } else{
            const newUser = new User({
                username,
                email,
                password
            })
            await newUser.save();
            res.redirect("/auth/login")
        }
    }
    catch(error){
        console.log(error)
    }
})



app.listen(process.env.PORT,()=>{
    console.log("Server Started")
})





