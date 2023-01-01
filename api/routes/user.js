const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const newFormat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const validator = require("validator");
const randomCatAvatar = require("./../middleware/randomCatAvatar");
const verifyToken = require("../middleware/auth");
const { uuid } = require("uuidv4");

// register user v2
router.post("/register", async (req, res) => {
  const { email, username, password, rePassword, secret } = req.body;

  const name = username;
  if (!name || !username || !email || !password) {
    return res.status(400).json({ msg: "Vui lòng tất cả các trường !" });
  }
  if (name.length < 3 || name.length > 20) {
    return res.status(400).json({
      msg: "Tên phải dài hơn 3 ký tự và ngắn hơn 20 ký tự !",
    });
  }

  if (newFormat.test(name)) {
    return res.status(400).json({ msg: "Tên không được có ký tự đặc biệt!" });
  }
  if (password.length < 6) {
    return res.status(400).json({ msg: "Mật khẩu phải dài hơn 6 ký tự!" });
  }
  const isEmail = validator.isEmail(email);
  if (!isEmail) {
    return res.status(400).json({ msg: "Vui lòng cung cấp một email hợp lệ!" });
  }
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ msg: "email đã tồn tại !" });
  }
  const image = randomCatAvatar();
  const user = await User({
    name,
    email,
    password,
    secret,
    image,
    username,
  });
  try {
    await user.save();
    return res.status(200).json({
      msg: "Register success. Let's login",
    });
  } catch (err) {
    return res.json(err.msg);
  }
});

// login v2
router.post("/login", async (req, res) => {
  const { email, password, rememberPassword } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Vui lòng nhập tất cả các trường !!!" });
  }
  if (password.length < 6) {
    return res.status(400).json({ msg: "Mật khẩu phải dài hơn 6 ký tự !!!" });
  }
  const isEmail = validator.isEmail(email);
  if (!isEmail) {
    return res.status(400).json({ msg: "email không hợp lệ !!!" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Email hoặc mật khẩu không đúng!" });
    }

    // const validPassword = await bcrypt.compare(password, user.password);
    // if (!validPassword)
    //     return res.status(400).json({ msg: "Email or password is not defined!" });

    if (password != user.password)
      return res.status(400).json({ msg: "Email hoặc mật khẩu không đúng!" });
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    user.password = "";
    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công !!",
      accessToken,
      user,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
//delete user

router.put("/delete-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, {
      isDelete: true,
    });
    if (!user) {
      return res.status(400).json({ msg: "No post found!" });
    }
    return res.status(200).json({ msg: "Delete successfully" });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});

router.put("/uplever-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, {
      role: "shiper",
    });
    if (!user) {
      return res.status(400).json({ msg: "No post found!" });
    }
    return res.status(200).json({ msg: "up lever successfully" });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
});
//update user v2
router.put("/update-user", async (req, res) => {
  const {
    id,
    name,
    about,
    image,
    newPassword,
    confirmNewPassword,
    currentPassword,
    city,
  } = req.body;
  // const userId = req.user;

  console.log(req.body);
  let data = { name };
  try {
    if (!name) {
      return res.status(400).json({ msg: "Please provider name!" });
    }
    if (newFormat.test(name)) {
      return res
        .status(400)
        .json({ msg: "Name cannot have special characters" });
    }
    // if (!username) {
    //     return res.status(400).json({ msg: "Please provider username!" });
    // }
    if (about) {
      data.about = about;
    }
    if (image) {
      data.image = image;
    }
    if (city) {
      data.city = city;
    }

    if (currentPassword) {
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ msg: "New passwords are not the same!" });
      }
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be longer than 6 characters!" });
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({ msg: "No user found" });
      }

      if (user.password != currentPassword) {
        return res
          .status(400)
          .json({ msg: "Current password is wrong! Try again!" });
      }
    }
    let user = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!user) {
      return res.status(400).json({ msg: "No user found!" });
    }
    if (newPassword) {
      user.password = newPassword;
      await user.save();
    }
    user.password = undefined;
    user.secret = undefined;
    // const token = jwt.sign({ _id: user._id }, process.env.JWT, {
    //     expiresIn: process.env.JWT_LIFETIME || "1d",
    // });
    return res.status(200).json({ msg: "Update user success.", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.msg);
  }
});
//get all user
router.get("/", async (req, res) => {
  try {
    const user = await User.find({
      isDelete: false,
    });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(403).json("Dont find");
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
// // //get all user
// router.get("/all", async (req, res) => {
//   try {
//     const user = await User.toArray((err, result) => {
//       if (err) throw err;
//       console.log(result);
//     });
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// follow user v2
// router.put("/follow", async (req, res) => {
//   const { followed, follower } = req.body;
//   try {
//     const userFollowed = await User.findByIdAndUpdate(
//       followed,
//       {
//         $addToSet: { follower: follower },
//       },
//       { new: true }
//     );
//     if (!userFollowed) {
//       return res.status(400).json({ msg: "No user found!" });
//     }

//     const userFollower = await User.findByIdAndUpdate(
//       follower,
//       {
//         $addToSet: { following: followed },
//       },
//       { new: true }
//     );
//     if (!userFollower) {
//       return res.status(400).json({ msg: "No user found!" });
//     }

//     res
//       .status(200)
//       .json({ msg: "Follow success!.", userFollowed, userFollower });
//   } catch (error) {
//     return res.status(400).json({ msg: "Something went wrong. Try again!" });
//   }
// });

// un-follow user v2
// router.put("/un-follow", async (req, res) => {
//   const { followed, follower } = req.body;

//   try {
//     const userFollowed = await User.findByIdAndUpdate(
//       followed,
//       {
//         $pull: { follower: follower },
//       },
//       { new: true }
//     );
//     if (!userFollowed) {
//       return res.status(400).json({ msg: "No user found!" });
//     }

//     const userFollower = await User.findByIdAndUpdate(
//       follower,
//       {
//         $pull: { following: followed },
//       },
//       { new: true }
//     );
//     if (!userFollower) {
//       return res.status(400).json({ msg: "No user found!" });
//     }

//     res.status(200).json({ msg: "Unfollowed!.", userFollowed, userFollower });
//   } catch (error) {
//     return res.status(400).json({ msg: "Something went wrong. Try again!" });
//   }
// });

// search user v2
router.get("/search-user/:query", async (req, res) => {
  const { query } = req.params;
  if (!query) return;
  try {
    // $regex is special method from mongodb
    // The i modify is used to preform case-insensitive matching
    const search = await User.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    }).select(
      "-password -secret -email -following -follower -createdAt -updatedAt"
    );
    return res.status(200).json({ msg: "ok", search });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Something went wrong. Try again!" });
  }
});

// suggest users v2
router.get("/suggest-user/:id", async (req, res) => {
  try {
    // current user
    const user = await User.findById(req.params.id);
    // array user following

    if (!user) {
      return res.status(400).json({ msg: "No user found!" });
    }
    let following = user.following;
    // ,
    // "_id image name username"
    const temp = await User.find({ _id: { $nin: following } })
      .select("-password -secret -following -follower -createdAt -updatedAt")
      .limit(10);
    const people = temp.filter((u) => u._id != req.params.id);
    return res.status(200).json({ msg: "Find success", people });
  } catch (error) {
    // return res.status(400).json({ msg: "Something went wrong. Try again!" });
    console.log(error);
  }
});

// get list user following v2
router.get("/user-following/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // current user
    const user = await User.findById(userId);
    // array user following
    if (!user) {
      return res.status(400).json({ msg: "No user found!" });
    }
    let following = user.following;
    //following.filter((f) => new mongoose.Types.ObjectId(f));

    const people = await User.find({ _id: { $in: following } })
      .select("-password -secret -following -follower -createdAt -updatedAt")
      .limit(100);
    return res
      .status(200)
      .json({ msg: "Find success", following: people, name: user.name });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Something went wrong. Try again!" });
  }
});

// get list user follower v2
router.get("/user-follower/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // current user
    const user = await User.findById(id);
    // array user follower
    if (!user) {
      return res.status(400).json({ msg: "No user found!" });
    }
    let follower = user.follower;
    //follower.filter((f) => new mongoose.Types.ObjectId(f));

    const people = await User.find({ _id: { $in: follower } })
      .select("-password -secret  -following -follower -createdAt -updatedAt")
      .limit(100);
    return res
      .status(200)
      .json({ msg: "Find success", follower: people, name: user.name });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Something went wrong. Try again!" });
  }
});

//get a user
// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       const { password, ...other } = user._doc;
//       return res.status(200).json(other);
//     } else {
//       return res.status(403).json("Dont find");
//     }
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

// //get all user
router.get("/all", async (req, res) => {
  try {
    const user = await User.toArray((err, result) => {
      if (err) throw err;
      console.log(result);
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
router.put("/:id/follow", verifyToken, async (req, res) => {
  if (req.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.userId);
      if (!user.followers.includes(req.userId)) {
        await user.updateOne({ $push: { followers: req.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", verifyToken, async (req, res) => {
  if (req.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.userId);
      if (user.followers.includes(req.userId)) {
        await user.updateOne({ $pull: { followers: req.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

router.patch("/update-user", async (req, res) => {
  try {
    const {
      name,
      username,
      about,
      image,
      password,
      rePassword,
      currentPassword,
    } = req.body;
    const userId = req.user.userId;
    let data = { name, username };
    if (!name) {
      return res.status(400).json({ msg: "Please provider name!" });
    }
    if (newFormat.test(name)) {
      return res
        .status(400)
        .json({ msg: "Name cannot have special characters" });
    }
    if (!username) {
      return res.status(400).json({ msg: "Please provider username!" });
    }
    if (about) {
      data.about = about;
    }
    if (image) {
      data.image = image;
    }
    if (currentPassword) {
      if (password !== rePassword) {
        return res.status(400).json({ msg: "New passwords are not the same!" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be longer than 6 characters!" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(400).json({ msg: "No user found" });
      }

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "Current password is wrong! Try again!" });
      }
    }

    let user = await User.findByIdAndUpdate(req.user.userId, data, {
      new: true,
    });
    if (!user) {
      return res.status(400).json({ msg: "No user found!" });
    }
    if (currentPassword) {
      user.password = password;
      await user.save();
    }
    user.password = undefined;
    user.secret = undefined;
    // const token = jwt.sign({ _id: user._id }, process.env.JWT, {
    //     expiresIn: process.env.JWT_LIFETIME || "1d",
    // });
    return res.status(200).json({ msg: "Update user success.", user });
  } catch (error) {
    if (error.code == 11000) {
      return res.status(400).json({ msg: "Duplicate username!" });
    }
    console.log(error);
    // return res.status(400).json({ msg: "UPDATE ERROR. Try again!" });
    return res.status(400).json(error.msg);
  }
});

module.exports = router;
