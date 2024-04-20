import bcrypt from "bcrypt";
import mongoose from "mongoose";
 import { User } from "../model/UserModel.js";
import jwt  from "jsonwebtoken";
import dotenv from "dotenv";
// import { Transaction } from "../model/Transaction.js";
// import { Product } from "../model/ProductModel.js";


// export const register =async (req, res) => {
// console.log(req.body)
//     try {
//         // const { Fname, Lname, email, password } = req.body;

//         // if (!Fname ) {
//         //     return res.status(400).json({ message: "fname is missing" })
//         // }

//         // if (!Lname ) {
//         //     return res.status(400).json({ message: "lname is missing" })
//         // }

//         // if (!email ) {
//         //     return res.status(400).json({ message: "email is missing" })
//         // }
//         // if (!password ) {
//         //     return res.status(400).json({ message: "password is missing" })
//         // }



export const register = async (req, res) => {
  
  try {
       

    const isMailExist = await User.findOne({email:req.body.email})

  
    if(!!isMailExist){
        return res.status(400).json({ message: "mail is exising , please enter another one" })
    }
 
        const newUser = new User(req.body)

        const saveUser = await newUser.save();

           return res.status(201).json({user:saveUser,message: 'successfully inserted admin into db' });

} catch (error) {
    return res.status(404).json({message: error.message || 'error' });      
}

}


export const login = async (req, res) => {

const getUser = await User.findOne({email:req.body.email,password:req.body.Password})

if(!getUser){
   return res.status(400).json({ message: 'invalid email or password' })
}


// ------




        const token = jwt.sign({ userId: getUser._id,isUser:getUser.isUser }, process.env.JWT_SECRET_KEY, {expiresIn:"10h"});

        // userid = userid,
        // isAdmin = true

        // GENERATE JWT TOKEN

   
        return res.status(200).json({ details: getUser, message: 'Successfull',token })


}


export const getUser = async (req, res) => {

try {
    const { id } = req.params;

const getUser = await User.findById(id)

if (!getUser) {
    return res.status(400).json({ message: "user is not found!" })
}

return res.status(200).json({details:getUser,message: 'invalid email' })
} catch (error) {
return res.status(400).json({message: error.message || 'error' })
    
}

}

export const getAllUsers = async (req, res) => {

try {

const getAllUsers = await User.find()

if (!getAllUsers.length > 0) {
    return res.status(400).json({ message: "colletion is not found!" })
}

return res.status(200).json({details:getAllUsers,message: 'users' })
} catch (error) {
return res.status(400).json({message: error.message || 'error' })
    
}

}