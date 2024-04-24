import mongoose from "mongoose";
import { Address } from '../model/AddressModel.js';
import { Cart } from "../model/CartModel.js";
import { Order } from "../model/OrderModel.js";
import { Product } from "../model/productModel.js";
import { Button } from "../model/Buttonmodel.js";




//CREATE
export const create = async (req, res) => {

const{fullname,phoneNumber,pinCode,state,houseNo,city,buildingName,roadName,total } =req.body;

if(!fullname || !phoneNumber || !pinCode || !state || !houseNo || !city  || !buildingName  || !roadName){
  return res.status(400).send({ message: "field is missing" });
}

  try {
    const newData = new Address(req.body);
console.log('working')
    const savedAddress= await newData.save();


    console.log(savedAddress,'ssss')
    const allCarts = await Cart.find({userId:new mongoose.Types.ObjectId(req.body.userId)});
    
    const newOrder = new Order({productsArray:allCarts,userId:req.body.userId,total:req.body.total,addressId:savedAddress._id});
   
    for( let cart of allCarts ){
      const product = await Product.findById(cart.productId);

      
      // console.log(product,'ddddd');

      if(product){

        if(product.quantity === 1){
          await product.save()
        }else{
          product.quantity --
          await product.save()
        }
        
        
        
      }else{
        const product = await Button.findById(cart.productId);
        if(product){

          if(product.quantity === 1){
            await product.save()
          }else{
  
            product.quantity --
            await product.save()
          }
      }
        

    }
  }


    const savedOrder = await newOrder.save();


    for( let cartsOf of allCarts  ){
      await Cart.findByIdAndDelete(cartsOf._id);

    }






    return res.status(201).json({
      result: savedOrder,
      message: "Order Placed",
    });
  } catch (error) {
    return res.status(404).json({ message: error.message || "error" });
  }
};

//GET ALL

export const getAll = async (req, res) => {
  try {
    const getDatas = await Address.find();

    return res.status(200).json({ result: getDatas });
  } catch (error) {
    console.log(error);
  }
};

//GET BY ID

export const getById = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(200).message({ message: "id not provided" });
    const getData = await Address.findById(req.params.id);

    return res.status(200).json({ result: getData });
  } catch (error) {
    console.log(error);
  }
};

//DELETE BY ID

export const deleteById = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error);
  }
};

//UPDATE BY ID

export const editAddress = async (req, res) => {
  // console.log(req.body);
  try {
    if (!req.params.id)
      return res.status(200).message({ message: "id not provided" });

    await Address.findByIdAndUpdate(req.params.id, { $set: req.body });

    return res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error);
  }
};
