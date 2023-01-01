const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema(
  {
    url: {
      type: String,
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

module.exports = mongoose.model("Banner", bannerSchema);
