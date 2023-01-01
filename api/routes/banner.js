const Banner = require("../models/Banner");
const router = require("express").Router();
router.post("/create-banner", async (req, res) => {
  const { url } = req.body;
  try {
    const banner = await Banner.create({
      url,
    });

    const bannered = await Banner.findById(banner._id);
    return res.status(200).json({ banner: "Thêm thành công !!!" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: err });
  }
});
router.get("/", async (req, res) => {
  try {
    const banner = await Banner.find({ isDelete: false });

    return res.status(200).json({ banner });
  } catch (error) {
    return error;
  }
});
router.put("/delete-banner/:id", async (req, res) => {
  try {
    const bannerId = req.params.id;
    const banner = await Banner.findByIdAndUpdate(bannerId, {
      isDelete: true,
    });
    if (!banner) {
      return res.status(400).json({ msg: "No post found!" });
    }
    return res.status(200).json({ msg: "Delete successfully" });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});

module.exports = router;
