import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product must have a name"],
  },
  description: {
    type: String,
    required: [true, "Product Description is required"],
  },
  price: {
    type: Number,
    required: [true, "product must have price"],
  },
  stock: {
    type: Number,
    required: [true, "product must have stock quantity"],
  },
  unit: {
    type: String,
    required: [true, "product must have a unit"],
  },
  quality: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "product must belong to a user"],
  },
  category: {
    type: String,
    enum: ["fruits", "vegetables", "milk products"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("product", ProductSchema);

export default Product;
