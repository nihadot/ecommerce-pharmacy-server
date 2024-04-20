import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        required: [true, "Please add the email address"],
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    },
    isUser:{
        type:Boolean,
        default:true
    }
},
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);
