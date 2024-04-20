import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please add image "],
    },
    title: {
      type: String,
      required: [true, "Please add title "],
    },
    content: {
      type: String,
      required: [true, "please add content"],
    },
  },
  {
    timestamps: true,
  }
);

export const Banner1 = mongoose.model("Banner1", schema);