const Product = require("../models/Product");
const User = require("../models/User");
const router = require("express").Router();

// const router = require("./user");

router.post("/create-product", async (req, res) => {
  const {
    name,
    img,
    desc,
    cpu,
    ram,
    storage,
    categoryId,
    color,
    price,
    quantity,
  } = req.body;

  try {
    const product = await Product.create({
      name,
      img,
      desc,
      cpu,
      ram,
      storage,
      categoryId,
      color,
      price,
      quantity,
    });

    const producted = await Product.findById(product._id);
    return res.status(200).json({ producted: "Thêm sản phẩm thành công" });
  } catch (error) {
    return res.json(error.message);
  }
});

router.get("/get-all-product", async (req, res) => {
  try {
    // const page = Number(req.query.page) || 1;
    // const perPage = Number(req.query.perPage) || 10;
    const products = await Product.find({ isDelete: false }).populate(
      "categoryId"
    );

    if (!products) {
      return res.status(400).json({ msg: "No posts found!" });
    }
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json(error.message);
    // console.log(error);
    // return res.status(400).json({ msg: error.msg });
  }
});
router.put("/delete-product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(productId, {
      isDelete: true,
    });
    if (!product) {
      return res.status(400).json({ msg: "No post found!" });
    }
    return res.status(200).json({ msg: "Delete successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
});

router.put("/update-product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { dataProduct } = req.body;

    // console.log(dataProduct);

    if (dataProduct?.name == "") {
      return res.status(400).json({ msg: "No name found!" });
    }
    const product = await Product.findByIdAndUpdate(productId, dataProduct, {
      new: true,
    });
    if (!product) {
      return res.status(400).json({ msg: "No post found!" });
    }
    return res.status(200).json({ msg: "update successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
});

// add to cart
router.put("/add-cart", async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const user = await User.findById(userId).populate("cart.product", "name");

    const listCart = user?.cart;
    let cartTemp = [];
    // user?.cart?.map((p) => {
    //   p?.product?._id == productId
    //     ? cartTemp.push({ product: p._id, quantity: (p += 1) })
    //     : cartTemp.push({
    //         product: productId,
    //         quantity: 1,
    //       });
    // });

    const checkExits = (obj, prId) => obj._id === prId;
    const check = listCart.some(checkExits);

    console.log(check);

    // const user = await User.findByIdAndUpdate(userId, {
    //   $addToSet: {
    //     cart: {
    //       product: productId,
    //       quantity: 1,
    //     },
    //   },
    // });
    const userNew = await User.findByIdAndUpdate(
      userId,
      { cart: cartTemp },
      { new: true }
    );
    return res.status(200).json({ msg: "something", userNew });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.msg);
  }
});

// get all product with cate v2
router.get("/get-all-product-with-cate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.find({
      categoryId: id,
      isDelete: false,
    }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
});

module.exports = router;
