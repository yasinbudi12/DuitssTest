const router = require("express").Router();
const port = process.env.PORT;
const UserRouter = require("./user");
const ProfileRouter = require("./profile");
const AvatarRouter = require("./avatar")

router.get("/", (req, res) => {
  res.status(200).json({
    msg: "Home Domain Conected",
    connectOn: port,
  });
});
router.use("/user", UserRouter);
router.use("/profile", ProfileRouter);
router.use('/avatar', AvatarRouter)

module.exports = router;
