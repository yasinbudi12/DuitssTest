const ProfileRouter = require("express").Router();
const { ProfileController } = require("../controller/index");
const authentication = require("../middleware/authentication");

ProfileRouter.post("/detail", ProfileController.GetFullDetail);
ProfileRouter.put("/update", authentication, ProfileController.UpdateProfile);

module.exports = ProfileRouter;
