const Category = require("../models/Category");
const router = require("express").Router();

// const { post } = require("./user");

router.post("/create-category", async (req, res) => {
  const { name, img } = req.body;
  try {
    const category = await Category.create({
      name,
      img,
    });

    const postCategory = await Category.findById(category._id);
    return res.status(200).json({ categoried: postCategory });
  } catch (err) {
    // console.log(err);
    return res.status(400).json({ err });
  }
});
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isDelete: false });
    return res.status(200).json({ categories });
  } catch (error) {
    return error;
  }
});
// delete post v2'
router.put("/delete-category/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndUpdate(categoryId, {
      isDelete: true,
    });
    if (!category) {
      return res.status(400).json({ msg: "No post found!" });
    }
    return res.status(200).json({ msg: "Delete successfully" });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});

// update category v2
router.put("/update-category/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { img, name } = req.body;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        img,
        name,
      },
      { new: true }
    );
    if (!category) {
      return res.status(400).json({ msg: "No post found!" });
    }
    return res
      .status(200)
      .json({ msg: "update successfully", categoried: category });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});

// get a cate
router.get("/:id", async (req, res) => {
  try {
    const cateId = req.params.id;
    const cate = await Category.findById(cateId);

    if (!cate) {
      return res.status(400).json({ msg: "No cate found!" });
    }
    return res.status(200).json({ cate });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});
module.exports = router;
