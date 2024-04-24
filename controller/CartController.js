
import { Cart } from "../model/CartModel.js";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Button } from "../model/Buttonmodel.js";

dotenv.config();

// export const addToCart = async (req, res) => {
//   try {

//       const newCart = new Cart(req.body)

//       const createCart = await newCart.save();
//       return res.status(201).json({ data: createCart, message: "Successfully inserted cart into db" });
//   } catch (error) {
//       return res.status(404).json({ message: error.message || 'error' });
//   }
// }


// export const listCartByUser = async (req, res) => {
//   console.log(req.params.id,'req.body.userId');
//   const cart = await Cart.aggregate([
//       {
//           $match:{ userId : new mongoose.Types.ObjectId(req.params.id)}
//       },
//       {
//           $lookup:{
//               from:"products",
//               localField:"productId",
//               foreignField:"_id",
//               as:"productInfo"
//           }
//       },
//       {
//           $unwind:"$productInfo" 
//       },
//   ])


  
//   // if(!cart){
//   //     return res.status(400).json({message:'cart not found'})
//   // }

//   // console.log(cart)
//   // return res.status(200).json({data:cart})



//   if(cart.length === 0) {
//       return res.status(404).json("no entries yet");
//   } else {
//       return res.status(200).json({ data: cart });
//   }
// }


// export const getById = async (req, res) => {
//   const cart = await Cart.findById(req.params.id)

//   if(cart) {
//       return res.status(200).json({ data: cart });
//   }else {
//       return res.status(404).json("no entries yet");
//   }
// }

// export const incrementCartQuantity = async (req, res) => {
//   try {
//       const cartItem = await Cart.findOneAndUpdate(
//           { productId: new mongoose.Types.ObjectId(req.params.productId),userId:new mongoose.Types.ObjectId(req.params.userId) }, // Assuming req.user contains the user's ID
//           { $inc: { quantity: 1 } }, // Increment quantity by 1
//           { new: true } // Return the updated document
//       );

//       if (!cartItem) {
//           return res.status(404).json({ message: 'Cart item not found' });
//       }

//       return res.status(200).json({ data: cartItem, message: 'Quantity incremented successfully' });
//   } catch (error) {
//       return res.status(500).json({ message: error.message || 'Internal server error' });
//   }
// };
// export const removeCartQuantity = async (req, res) => {
//   try {
//       // Find and remove the cart item by productId and userId
//       const removedItem = await Cart.findOneAndDelete(
//           { productId: new mongoose.Types.ObjectId(req.params.productId), userId: req.params.userId } // Assuming req.user contains the user's ID
//       );

//       if (!removedItem) {
//           return res.status(404).json({ message: 'Cart item not found' });
//       }

//       return res.status(200).json({ data: removedItem, message: 'Item removed from cart successfully' });
//   } catch (error) {
//       return res.status(500).json({ message: error.message || 'Internal server error' });
//   }
// };

// export const decrementCartQuantity  = async (req, res) => {
//   try {
//       const cartItem = await Cart.findOneAndUpdate(
//           { productId: new mongoose.Types.ObjectId(req.params.productId),userId:new mongoose.Types.ObjectId(req.params.userId) }, // Assuming req.user contains the user's ID
//           { $inc: { quantity: -1 } }, // 
//           { new: true } 
//       );

//       if (!cartItem) {
//           return res.status(404).json({ message: 'Cart item not found' });
//       }

//       return res.status(200).json({ data: cartItem, message: 'Quantity incremented successfully' });
//   } catch (error) {
//       return res.status(500).json({ message: error.message || 'Internal server error' });
//   }
// };

export const addToCart = async (req, res) => {
    try {
      const isExistProduct = await Cart.findOne({
        productId: new mongoose.Types.ObjectId(req.body.productId),
        userId: new mongoose.Types.ObjectId(req.body.userId),
      });
  
      if (isExistProduct) {
        const copy = { ...isExistProduct._doc };
        console.log(copy);
        copy.quantity = copy.quantity + 1;
        const saveData = await Cart.findByIdAndUpdate(
          isExistProduct._id,
          { $set: copy },
          { new: true }
        );
        return res.status(201).json({ result: saveData, message: "incremented" });
      } else {

        console.log(req.body)
        const newData = new Cart(req.body);
        const saveData = await newData.save();
        if (saveData) {
          return res.status(201).json({
            result: saveData,
            message: "successfully inserted cart into db",
          });
        }
      }
    } catch (error) {
      return res.status(404).json({ message: error.message || "error" });
    }
  };
  
  export const getOffersCard = async (req, res) => {
    // console.log(req.params.id,'req.body.userId');

    const getofferCards = await Cart.find()
let products = []
    for (let obj of getofferCards){
      const getofferCard = await Button.findById(obj.productId)
      
      
      if(getofferCard){
        products.push({...obj._doc,product:getofferCard})
      }
    }
 
      return res.status(200).json({ result: products });
    
  };
  export const listCartByUser = async (req, res) => {
    // console.log(req.params.id,'req.body.userId');
    const getData = await Cart.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
    ]);
  
    if (getData.length === 0) {
      return res.status(404).json("no entries yet");
    } else {
      return res.status(200).json({ result: getData });
    }
  };
  
  export const getById = async (req, res) => {
    const getData = await Cart.findById(req.params.id);
  
    if (getData) {
      return res.status(200).json({ result: getData });
    } else {
      return res.status(404).json("no entries yet");
    }
  };
  
  export const removeCartQuantity = async (req, res) => {
    try {
      // Find and remove the cart item by productId and userId
      const getData = await Cart.findOneAndDelete(
        {
          productId: new mongoose.Types.ObjectId(req.params.productId),
          userId: req.params.userId,
        } // Assuming req.user contains the user's ID
      );
  
      if (!getData) {
        return res.status(404).json({ message: "Cart item not found" });
      }
  
      return res.status(200).json({
        result: getData,
        message: "Item removed from cart successfully",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  };
  
  export const decrementCartQuantity = async (req, res) => {
    try {
      if (!req.params.productId)
        return res.status(400).json({ message: "product id not provided" });
      if (!req.params.userId)
        return res.status(400).json({ message: "user id not provided" });
  
      const isExistProduct = await Cart.findOne({
        productId: new mongoose.Types.ObjectId(req.params.productId),
        userId: new mongoose.Types.ObjectId(req.params.userId),
      });
  
      if (isExistProduct.quantity === 0) {
        const saveData = await Cart.findByIdAndDelete(isExistProduct._id);
        return res.status(201).json({ message: "remove from cart" });
      }
  
      if (isExistProduct) {
        const copy = { ...isExistProduct._doc };
  
        copy.quantity = copy.quantity - 1;
        const saveData = await Cart.findByIdAndUpdate(
          isExistProduct._id,
          { $set: copy },
          { new: true }
        );
        return res.status(201).json({ result: saveData, message: "incremented" });
      } else {
        return res.status(400).json({ message: "cart not exist" });
      }
    } catch (error) {
      return res.status(404).json({ message: error.message || "error" });
    }
  };
  export const incrementCartQuantity = async (req, res) => {
    try {
      if (!req.params.productId)
        return res.status(400).json({ message: "product id not provided" });
      if (!req.params.userId)
        return res.status(400).json({ message: "user id not provided" });
  
      const isExistProduct = await Cart.findOne({
        productId: new mongoose.Types.ObjectId(req.params.productId),
        userId: new mongoose.Types.ObjectId(req.params.userId),
      });
  
      if (isExistProduct) {
        const copy = { ...isExistProduct._doc };
  
        copy.quantity = copy.quantity + 1;
        const saveData = await Cart.findByIdAndUpdate(
          isExistProduct._id,
          { $set: copy },
          { new: true }
        );
        return res.status(201).json({ result: saveData, message: "incremented" });
      } else {
        return res.status(400).json({ message: "cart not exist" });
      }
    } catch (error) {
      return res.status(404).json({ message: error.message || "error" });
    }
  };
  
  // export const deleteById = async (req, res) => {
  //   await Cart.findByIdAndDelete(req.params.id);
  
  //   return res.status(200).json({ message: "deleted" });
  // };
  
  // export const updateById = async (req, res) => {
  //   await Cart.findByIdAndUpdate(req.params.id);
  
  //   return res.status(200).json({ message: "updated" });
  // }; export const removeCartQuantity = async (req, res) => {




  export const removeCartofferQuantity = async (req, res) => {

    try {
      // Find and remove the cart item by productId and userId
      const getData = await Cart.findOneAndDelete(
        {
          productId: new mongoose.Types.ObjectId(req.params.productId),
          userId: req.params.userId,
        } // Assuming req.user contains the user's ID
      );
  
      if (!getData) {
        return res.status(404).json({ message: "Cart item not found" });
      }
  
      return res.status(200).json({
        result: getData,
        message: "Item removed from cart successfully",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  };
  


  export const decrementofferCartQuantity = async (req, res) => {
    try {
      if (!req.params.productId)
        return res.status(400).json({ message: "product id not provided" });
      if (!req.params.userId)
        return res.status(400).json({ message: "user id not provided" });
  
      const isExistProduct = await Cart.findOne({
        productId: new mongoose.Types.ObjectId(req.params.productId),
        userId: new mongoose.Types.ObjectId(req.params.userId),
      });
  
      if (isExistProduct.quantity === 0) {
        const saveData = await Cart.findByIdAndDelete(isExistProduct._id);
        return res.status(201).json({ message: "remove from cart" });
      }
  
      if (isExistProduct) {
        const copy = { ...isExistProduct._doc };
  
        copy.quantity = copy.quantity - 1;
        const saveData = await Cart.findByIdAndUpdate(
          isExistProduct._id,
          { $set: copy },
          { new: true }
        );
        return res.status(201).json({ result: saveData, message: "incremented" });
      } else {
        return res.status(400).json({ message: "cart not exist" });
      }
    } catch (error) {
      return res.status(404).json({ message: error.message || "error" });
    }
  };



  export const incrementofferCartQuantity = async (req, res) => {
    try {
      if (!req.params.productId)
        return res.status(400).json({ message: "product id not provided" });
      if (!req.params.userId)
        return res.status(400).json({ message: "user id not provided" });
  
      const isExistProduct = await Cart.findOne({
        productId: new mongoose.Types.ObjectId(req.params.productId),
        userId: new mongoose.Types.ObjectId(req.params.userId),
      });
  
      if (isExistProduct) {
        const copy = { ...isExistProduct._doc };
  
        copy.quantity = copy.quantity + 1;
        const saveData = await Cart.findByIdAndUpdate(
          isExistProduct._id,
          { $set: copy },
          { new: true }
        );
        return res.status(201).json({ result: saveData, message: "incremented" });
      } else {
        return res.status(400).json({ message: "cart not exist" });
      }
    } catch (error) {
      return res.status(404).json({ message: error.message || "error" });
    }
  };
  