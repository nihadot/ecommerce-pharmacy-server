import mongoose from "mongoose";
import { Product } from "../model/productModel.js";

export const createProduct =async (req, res) => {
    try {
    //   const isProductExist = await Product.findOne({name:req.body.name})
    //     if(!isProductExist){
    //         return res.status(400).json({ message: "product name is exising , please enter another one" })
    //     }
        const newProduct = new Product(req.body)
        
        
        const createdProduct = await newProduct.save();
        return res.status(201).json({product:createdProduct,message: 'successfully inserted product into db' });

    } catch (error) {
        return res.status(404).json({message: error.message || 'error' });      
    }
}

export const getProducts = async (req, res) => {
    const Products= await Product.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"dropdown",
                foreignField:"_id",
                as:"categoriesInfo"
            }
        }
    ])
        return res.status(200).json({ product: Products });
   
}

export const getProductById = async (req, res) => {

    // const Products= await Product.findById(req.params.id)
    //     return res.status(200).json({ product: Products });
    const Products = await Product.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"dropdown",
                foreignField:"_id",
                as:"categoriesInfo"
            }
        },
        {
            $unwind: "$categoriesInfo"
        }
    ])
    // console.log(Product);

    if(Products.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ product: Products });
    }
}
export const getOneProduct = async (req, res) => {

    // const Products= await Product.findById(req.params.id)
    //     return res.status(200).json({ product: Products });
    // const Products = await Product.aggregate([
    //     {
    //         $lookup:{
    //             from:"categories",
    //             localField:"dropdown",
    //             foreignField:"_id",
    //             as:"categoriesInfo"
    //         }
    //     },
    //     {
    //         $unwind: "$categoriesInfo"
    //     }
    // ])

    const Products = await Product.findById(req.params.id)
    // console.log(Product);

    if(Products?.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ product: Products });
    }
}












export const deleteProductById = async (req, res) => {

    try {
        if(!req.params.id){
            return res.status(400).json({ message: "error while deleting!" });
        }
    
        await Product.findByIdAndDelete(req.params.id)
            return res.status(200).json({ message: "deleted" });
        
    } catch (error) {
        return res.status(200).json({ message: error.message || "deleted" });
        
    }
}


export const editProduct = async (req, res) => {

    console.log(req.body);
    console.log(req.params.id);
   try {
        
        // if(!req.params.id){
        //     return res.status(400).json({ message: "error while deleting!" });
        // }
    
        await Product.findByIdAndUpdate(req.params.id,{$set:req.body})
            return res.status(200).json({ message: "updated" });
        
    } catch (error) {
        // return res.status(400).json({ message: error.message || "updated" });
        console.log(error);


    }
   
}




        export const getproductsByCategory = async (req, res) => {
    
            const Products = await Product.find({dropdown:new mongoose.Types.ObjectId(req.params.id)})
            // console.log(new mongoose.Types.ObjectId(req.params.id));
        
            if(Products.length === 0) {
                return res.status(404).json("no entries yet");
            } else {
                return res.status(200).json({ product: Products });
            }
        }


        export const searchProduct = async (req, res) => {
            try {
              console.log(req?.query?.name);
              let filter = {};
              if (req?.query?.name) {
                filter = {
                  productName: { $regex: req.query.name, $options: "i" },
                };
              } 
              const products = await Product.find(filter);
              return res.status(200).json({ product: products });
            } catch (error) {
              console.log(error, "error");
              return res.status(400).json({ message: "error" });
            }
          };


















