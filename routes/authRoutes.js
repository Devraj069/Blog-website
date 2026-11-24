const express = require("express")

const userRoutes = express.Router();
const{
    getLogin,
    login,
    getRegister,
    register
}= require("../controllers/authController")


userRoutes.get("/login",getLogin)
userRoutes.get("/register",getRegister)

userRoutes.post("/login",login)
userRoutes.post("/register",register)


module.exports = userRoutes;