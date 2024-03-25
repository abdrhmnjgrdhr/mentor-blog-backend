import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { Errorhandler } from "../utils/err.js";
import jwt from "jsonwebtoken"
export const signup=async(req,res,next)=>{
const {username,email,password}=req.body;

if(!username||
    !email||
    !password
    ||username==''||
    email==''||
    password=='')
    {
 next(Errorhandler(400,"All fields are required"))
}
const hashedpassword=bcryptjs.hashSync(password,10)

const NewUser=new User({
    username,
    email,
    password:hashedpassword
})
try{
    await NewUser.save();
res.json("Signup successfully")
console.log(req.body);
}
catch(err){
  next(err)
}
}
export const signin=async(err,res,req,next)=>{
const {email,password}=req.body;

if(!email||!password||email==''||password==''){
    next(Errorhandler(400,"All fields are required"))
}
try{
var  Validuser=User.findOne({email})
if(!Validuser){
    return next(Errorhandler(404,"user not found"))
}
var Validpass=bcryptjs.compareSync(password,Validuser.password)
if(!Validpass){
    return next(Errorhandler(404,"password is incorrect"))
}
const token=jwt.sign(
{id:Validuser._id},process.env.JWT_SECRECT)
const {password:pass,...rest}=Validuser._doc
res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest)
}
catch(err){
    next(err)
}
}