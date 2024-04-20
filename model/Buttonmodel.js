import mongoose from "mongoose";

const offercardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add Offer card title"]
    },
    description: {
        type: String,
        required: [true, "Please add description"]
    },
    timeline: {
        type: String,
    },
    offerRate: {
        type: String,
    },
    image:{
        type:String,
    },
    cost:{
        type:String,
    },
    isOffercard:{
        type:Boolean,
        default:true
    },
},
    {
        timestamps:true
    }
);

export const Button= mongoose.model("Offercard", offercardSchema);