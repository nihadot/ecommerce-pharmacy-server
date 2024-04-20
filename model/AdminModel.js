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
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin:{
        type:Boolean,
        default:true
    },
    profile:{
        type:String,
    }
},
    {
        timestamps: true,
    }
);

export const Admin = mongoose.model("Admin", adminSchema);
