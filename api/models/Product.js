const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    cpu: {
      type: String,
      required: true,
    },
    ram: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    color: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", userSchema);
