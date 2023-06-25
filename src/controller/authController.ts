import { Request, Response } from 'express';
const jwt = require("jsonwebtoken")
const {expressjwt} = require("express-jwt")

exports.login =async (req : Request, res : Response) => {
    const {username,password} = req.body
    if(password === process.env.Password){
        const token = jwt.sign({username},process.env.JWT,{expiresIn:"1d"})
        return res.json({token})
    }else{
        return res.status(400).json({error : "Password invalid"})
    }
}

exports.auth = expressjwt({
    secret: "mern-stack-crud-secret@12345778",
    algorithms:["HS256"],
    userProperty: "auth"
})

