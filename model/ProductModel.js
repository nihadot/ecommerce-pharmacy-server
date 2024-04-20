import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the name"],
    },
    price: {
        type: Number,
        required: [true, "Please add the price"],
    },
    deliveryCost: {
        type: Number,
        required: [true, "Please add the Delivery Cost"],
    },
    description: {
        type: String,
        required: [true, "Please add the description"],
    },
    selectedSize: {
        type: String,
        required: [true, "Please add the size"],
    },
   
    quantity: {
        type: Number,
        required: [true, "Please add the quantity"],
    },
    image:[{
        image:String
    }],
    mainimage:{
        type:String,
    },
    dropdown:{
        type:mongoose.Types.ObjectId,
    },
},
    {
        timestamps: true,
    }
);

export const Product = mongoose.model("Product", productSchema);
