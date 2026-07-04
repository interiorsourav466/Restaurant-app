import mongoose from "mongoose";
const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    isSpecial: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
menuSchema.index({ name: "text" });

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
