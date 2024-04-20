import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: [true, "Please add the firstname"],
    },
    Lname: {
        type: String,
        required: [true, "Please add the lastname"],
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add the product id"],
    },
    userId: {
        type:  mongoose.Schema.Types.ObjectId,
        required: [true, "Please add the user id"],
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
    },

    paymentId:{
        type: mongoose.Schema.Types.ObjectId,
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