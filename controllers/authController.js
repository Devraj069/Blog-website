const User = require("../models/User")

//Render Login Page
exports.getLogin=(req,res)=>{
    res.render("login")
}
//login main logic
exports.login=async (req,res)=>{
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
}

//render register page
exports.getRegister=(req,res)=>{
    res.render("register")
}

//register main Logic
exports.register=async (req,res)=>{
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
            res.redirect("/login")
        }
    }
    catch(error){
        console.log(error)
    }
}