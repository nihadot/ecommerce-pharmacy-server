import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({

 
    addressId:{
        type: mongoose.Schema.Types.ObjectId,

    },
    total:{
        type: String

    },
    userId: {
        type:  mongoose.Schema.Types.ObjectId,
       
    },
    productsArray: {
        type:Array
    }
},
    {
        timestamps: true,
    }
);

export const Order = mongoose.model("Order", adminSchema);