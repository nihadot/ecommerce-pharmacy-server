import express, { Router } from "express";
// import multer from "multer"

import { createProduct,deleteProductById,getProductById,getProducts,getproductsByCategory,searchProduct } from "../controller/productController.js";
import mongoose from "mongoose";


const router = Router();


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
//     }
// })

// const upload = multer({ storage: storage })

// router.post('/',upload.single("profile"),(req,res)=>{
   
//     console.log(req.file,"image uploaded")
//     // return true;
//     mongoose.connection.collection("products").insertOne({...req.body,profile:req.file?.filename})
//     res.json({message:"uploaded"});
// });


router.post('/',createProduct)
router.get('/',getProducts)
router.get('/:id', getProductById)
// router.put("/:id",updateProductById)
router.get('/search',searchProduct)
router.delete("/:id", deleteProductById )
router.get('/getproducts-bycat/:id', getproductsByCategory);


export default router;