import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
},
  fullname: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  pinCode: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  
  houseNo: {
    type: String,
    required: true
  },
  
  buildingName: {
    type: String,
    required: true
  },
   
  roadName:  {
    type: String,
    required: true
  },
  areaColony: {
    type: String,
    required: true
  },
   
  // addressType: {
  //   type: String,
  //   enum: ['Home', 'Work', 'Other'] // Assuming address type can be one of these options
  // }
},


{
    timestamps:true
}


);

 export const Address = mongoose.model('Address', addressSchema);

