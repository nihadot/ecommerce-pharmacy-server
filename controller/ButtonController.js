import mongoose from "mongoose";
import {Button } from"../model/Buttonmodel.js"


export const createButton= async (req, res) => {
    try {
        // const { title, description, timeline, offerRate } = req.body;

        // if(!title) {
        //     return res.status(400).json({ message: "title is missing" });
        // }
        // if(!description) {
        //     return res.status(400).json({ message: "description is missing" });
        // }
        // if(!timeline) {
        //     return res.status(400).json({ message: "rate is missing" });
        // }
        // if(!offerRate) {
        //     return res.status(400).json({ message: "offer-rate is missing" });
        // }
       
        const isCardExist = await Button.findOne({ name:req.body.title});

        // if(!!isCardExist) {
        //     return res.status(400).json({ message: "card name is existing...Please enter another one" });
        // }

        const newCard = new Button(req.body)

        const createdCard = await newCard.save();
        return res.status(201).json({ data: createdCard, message: "Successfully inserted card data into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const getButton= async (req, res) => {
    const Cards = await Button.find()

    if(Cards.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ Offercard: Cards });
    }
}


export const getButtonById = async (req, res) => {
    const response = await mongoose.connection.collection("card").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if(response) {
        return res.status(200).json({ Offercard: response });
    }else {
        return res.status(404).json("no entries yet");
    }
}


export const deleteButtonById = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: "error while deleting!!!" });
        }
        await Button.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.status(200).json({ message: error.message || 'error' });
    }
}


export const updateButtonById = async (req, res) => {
    console.log(req.params.id);

    try {
        if(!req.params.id) {
            return res.status(400).json({ message: 'error while deleting!' });
        }

        await Button.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({ message: "updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message || "updation error" })
    }
}