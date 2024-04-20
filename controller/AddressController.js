import mongoose from "mongoose";
import { Address } from '../model/AddressModel.js';




// export const createAddress = async (req, res) => {
//     try {
//       const newAddress = new Address(req.body);
//       const savedAddress = await newAddress.save();
//       res.status(201).json(savedAddress);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };






// // Get all addresses
// export const getAddresses = async (req, res) => {
//   try {
//     const addresses = await Address.find();
//     res.json(addresses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get address by ID
// export const getAddressById = async (req, res) => {
//   try {
//     const address = await Address.findById(req.params.id);
//     if (!address) {
//       return res.status(404).json({ message: 'Address not found' });
//     }
//     res.json(address);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete address by ID
// export const deleteAddressById = async (req, res) => {
//   try {
//     const address = await Address.findByIdAndDelete(req.params.id);
//     if (!address) {
//       return res.status(404).json({ message: 'Address not found' });
//     }
//     res.json({ message: 'Address deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update address by ID
// export const editAddressById = async (req, res) => {
//   try {
//     const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!address) {
//       return res.status(404).json({ message: 'Address not found' });
//     }
//     res.json(address);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

//CREATE
export const create = async (req, res) => {
  console.log(req.body);

const{fullname,phoneNumber,pinCode,state,houseNo,city,buildingName,roadName } =req.body;

if(!fullname || !phoneNumber || !pinCode || !state || !houseNo || !city  || !buildingName  || !roadName){
  return res.status(400).send({ message: "field is missing" });
}

  try {
    const newData = new Address(req.body);

    const saveData = await newData.save();

    return res.status(201).json({
      result: saveData,
      message: "Successfully inserted address into db",
    });
  } catch (error) {
    return res.status(404).json({ message: error.message || "error" });
  }
};

//GET ALL

export const getAll = async (req, res) => {
  try {
    const getDatas = await Address.find();

    return res.status(200).json({ result: getDatas });
  } catch (error) {
    console.log(error);
  }
};

//GET BY ID

export const getById = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(200).message({ message: "id not provided" });
    const getData = await Address.findById(req.params.id);

    return res.status(200).json({ result: getData });
  } catch (error) {
    console.log(error);
  }
};

//DELETE BY ID

export const deleteById = async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error);
  }
};

//UPDATE BY ID

export const editAddress = async (req, res) => {
  // console.log(req.body);
  try {
    if (!req.params.id)
      return res.status(200).message({ message: "id not provided" });

    await Address.findByIdAndUpdate(req.params.id, { $set: req.body });

    return res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error);
  }
};
