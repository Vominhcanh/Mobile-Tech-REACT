const mongoose = require("mongoose");
const validator = require("validator");
const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sdt: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    product: {
      type: Array,
    },
    boughtBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    orderStatus: {
      type: String,
      default: "Chờ xác nhận",
    },
    payStatus: {
      type: String,
      default: "Chưa thanh toán",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    shipBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
