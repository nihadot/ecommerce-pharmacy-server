import express from "express";
import cors from "cors";
import connectDb from "./config/DbConnection.js";
import adminRouter from "./router/adminRouter.js";
import userRouter from "./router/UserRouter.js";
import orderRouter from "./router/orderRouter.js";
import productRouter from "./router/productRouter.js"
import cartRouter from "./router/cartRouter.js"
import bannerRouter from "./router/bannerRouter.js"
import banner2Router from "./router/banner2Router.js"
import banner3Router from "./router/banner3Router.js"
import blogRouter from "./router/blogRouter.js"
import categoryRouter from "./router/categoryRouter.js"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
 import { editProduct } from "./controller/productController.js";
 import buttonRouter from "./router/buttonRouter.js"
 import banneroneRouter from "./router/banneroneRouter.js"
 import bannertwoRouter from "./router/bannertwoRouter.js"
 import wishlistRoute from "./router/wishlistRouter.js"
 import addressRouter from "./router/addressRouter.js"
import { getOffersCard } from "./controller/CartController.js";
import { Order } from "./model/OrderModel.js";
import mongoose from "mongoose";
import { Product } from "./model/productModel.js";
import { Address } from "./model/AddressModel.js";
import { User } from "./model/UserModel.js";


  
const app = express();
connectDb();
dotenv.config();
app.use(cors())
app.use(express.json({limit:"50mb"}));
app.use(express.static(process.env.FILE_UPLOADING_PATH));
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRouter);
app.use('/api/wishlist', wishlistRoute)
app.use("/api/product", productRouter);
 app.use("/api/users", userRouter);
 app.use("/api/orders", orderRouter);
 app.put("/api/editform/:id",editProduct)
 app.use('/api/banner', bannerRouter)
app.use('/api/banner2', banner2Router)
app.use('/api/banner3', banner3Router)
app.use('/api/post', blogRouter)
app.use('/api/category', categoryRouter)
app.use('/api/buttons', buttonRouter)
app.use('/api/bannerone', banneroneRouter)
app.use('/api/bannertwo', bannertwoRouter)
app.use('/api/address', addressRouter)
app.get('/api/offercard/:id', getOffersCard)
app.get('/api/geetorders/getById/:id',async(req,res)=>{
    


    const getOrders = await Order.find({userId:new mongoose.Types.ObjectId(req.params.id)})


    console.log(getOrders,'ooooo')
    // return true
let getOrdersArray = []
    for ( let ord of getOrders){
        let arr = []
        if(ord.productsArray.length > 0){

            for(let ordOne of ord.productsArray){
                if(ordOne?.productId){
                    // console.log(ordOne.productId);
                    const getproductOne = await Product.findById(ordOne.productId)
                    arr.push(getproductOne)
                }
                
            }
        }
        
        let addreess = ''
        if(ord.addressId){
            addreess = await Address.findById(ord.addressId)
        }
        getOrdersArray.push({...ord._doc,productsArray:arr,addressInfo:addreess})

    }
    return res.status(200).json({data:getOrdersArray });

})

app.get('/api/user/getById/:id',async(req,res)=>{
    


    const getUser = await User.findById(req.params.id)



    return res.status(200).json({data:getUser });

})



app.get("/api/profile",(req,res)=>{
    console.log("api");
    console.log(req.headers.authorization);
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY,async function(err, decoded) {
        console.log(decoded) // bar
        // req.userId = decoded.userId
        const user = await user.findById(decoded.userId) 

        console.log(user)

        if(!user){
            return res.status(400).json({ message: "user not found" })
        }

        return res.status(200).json({user:user });

      });


});









app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on PORT ${process.env.PORT || 3000}`);
})