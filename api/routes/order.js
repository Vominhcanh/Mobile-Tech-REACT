const Order = require("../models/Order");
const router = require("express").Router();
router.post("/create-order", async (req, res) => {
  const { name, sdt, address, product, userId, total, payStatus } = req.body;

  try {
    const order = await Order.create({
      name,
      sdt,
      address,
      product,
      boughtBy: userId,
      total,
      payStatus: payStatus ? payStatus : "Chưa thanh toán",
    });

    const ordered = await Order.findById(order._id);
    return res.status(200).json({ ordered });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: err });
  }
});

router.get("/all-order", async (req, res) => {
  try {
    const order = await Order.find().populate("shipBy");
    if (!order) {
      return res.status(400).json({ msg: "No order found!" });
    }
    return res.status(200).json({ order });
    console.log("abc");
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: err });
  }
});

router.put("/change-status-order/:id", async (req, res) => {
  const orderId = req.params.id;
  const { status, shipBy, payStatus } = req.body;

  console.log(shipBy);
  const order = await Order.findByIdAndUpdate(
    orderId,
    {
      orderStatus: status,
      shipBy,
      payStatus: payStatus,
    },
    {
      new: true,
    }
  );
  // .populate("postedBy", "-password -secret")
  // .populate("comments.postedBy", "-password -secret");
  // const savedPost = await post.save();

  if (!order) {
    return res.status(400).json({ msg: "No order found!" });
  }
  return res.status(200).json({ msg: "Updated order success", order });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.find({ boughtBy: id });

    return res.status(200).json({ order });
  } catch (error) {
    return error;
  }
});

router.get("/order-detail/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate("shipBy");
    if (!order) {
      return res.status(400).json({ msg: "No post found!" });
    }
    return res.status(200).json({ order });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});

// router.put("/delete-banner/:id", async (req, res) => {
//   try {
//     const bannerId = req.params.id;
//     const banner = await Banner.findByIdAndUpdate(bannerId, {
//       isDelete: true,
//     });
//     if (!banner) {
//       return res.status(400).json({ msg: "No post found!" });
//     }
//     return res.status(200).json({ msg: "Delete successfully" });
//   } catch (error) {
//     return res.status(400).json({ msg: error });
//   }
// });

module.exports = router;
