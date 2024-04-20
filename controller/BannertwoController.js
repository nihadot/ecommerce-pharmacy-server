
import { Banner22 } from "../model/BannertwoModel.js";

//CREATE Banner1

export const create = async (req, res) => {
  try {
    const newData = new Banner22(req.body);

    const saveData = await newData.save();

    return res.status(201).json({
      result: saveData,
      message: "Successfully inserted Banner1 into db",
    });
  } catch (error) {
    return res.status(404).json({ message: error.message || "error" });
  }
};

//GET ALL Banner1

export const getAll = async (req, res) => {
  try {
    const getDatas = await Banner22.find();

    return res.status(200).json({ result: getDatas });
  } catch (error) {
    console.log(error);
  }
};

//GET BY ID Banner1

export const getById = async (req, res) => {
  try {
    const getData = await Banner22.findById(req.params.id);

    return res.status(200).json({ result: getData });
  } catch (error) {
    console.log(error);
  }
};

//DELETE BY ID Banner1

export const deleteById = async (req, res) => {
  // console.log(req.body);
  try {
    await Banner22.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error);
  }
};
//UPDATE BY ID Banner1

export const editBanner2 = async (req, res) => {
  // console.log(req.body);
  try {
    await Banner22.findByIdAndUpdate(req.params.id, { $set: req.body });

    return res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error);
  }
};