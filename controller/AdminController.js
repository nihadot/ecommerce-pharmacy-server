import bcrypt from "bcrypt";
import mongoose, { get } from "mongoose";
import { Admin } from "../model/AdminModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const register =async (req, res) => {


    try {
       

        const isMailExist = await Admin.findOne({email:req.body.email})

      
        if(!!isMailExist){
            return res.status(400).json({ message: "mail is exising , please enter another one" })
        }
     
            const newAdmin = new Admin(req.body)

            const saveAdmin = await newAdmin.save();

               return res.status(201).json({user:saveAdmin,message: 'successfully inserted admin into db' });
   
    } catch (error) {
        return res.status(404).json({message: error.message || 'error' });      
    }

}


export const login = async (req, res) => {

    const getAdmin = await Admin.findOne({email:req.body.email,password:req.body.Password})

    if(!getAdmin){
       return res.status(400).json({ message: 'invalid email or password' })
    }


// ------
    
 

            const token = jwt.sign({ userId: getAdmin._id,isAdmin:getAdmin.isAdmin  }, process.env.JWT_SECRET_KEY, {expiresIn:"10h"});

            // userid = userid,
            // isAdmin = true

            // GENERATE JWT TOKEN

       
            return res.status(200).json({ details: getAdmin, message: 'Successfull',token })
  

}


export const getAdmin = async (req, res) => {

    try {
        const { id } = req.params;

    const getAdmin = await Admin.findById(id)

    if (!getAdmin) {
        return res.status(400).json({ message: "admin is not found!" })
    }

    return res.status(200).json({users:getAdmin})
    } catch (error) {
    return res.status(400).json({message: error.message || 'error' })
        
    }

}

export const getAllAdmin = async (req, res) => {
    
    try {

    const getAllAdmin = await Admin.find()

    if (!getAllAdmin.length > 0) {
        return res.status(400).json({ message: "colletion is not found!" })
    }

    return res.status(200).json({users:getAllAdmin,message: 'users' })
    } catch (error) {
    return res.status(400).json({message: error.message || 'error' })
        
    }

}
export const updateAdminProfile = async (req, res) => {
    try {

        const getAdmin = await Admin.findById(req.users.userId)

        if(!getAdmin) {
            return res.status(400).json({ message: "admin is not found "});
        }

        await Admin.findByIdAndUpdate(req.users.userId,{$set:req.body})

        return res.status(200).json({ message: 'updated admin' });
    } catch (error) {
        return res.status(400).json({ message: error.message || 'error' });
    }
}
