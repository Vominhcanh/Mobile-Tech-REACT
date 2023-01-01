// @ts-nocheck
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      minlength: 3,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please provide username!"],
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      require: [true, "Please provider email!"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provider a valid email!",
      },
    },
    password: {
      type: String,
      trim: true,
      require: [true, "Please provider password!"],
      minlength: 6,
      select: true,
    },

    image: {
      type: String,
    },
    role: {
      type: String,
      default: "client",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "product" },
        quantity: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
