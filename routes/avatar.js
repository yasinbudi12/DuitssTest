const AvatarRoute = require("express").Router();
const { AvatarController } = require("../controller/index");
const authentication = require("../middleware/authentication");
const formDataParser = require("../middleware/formidable");

AvatarRoute.get("/:id", AvatarController.GetAvatarImage);
AvatarRoute.post(
  "/add",
  authentication,
  formDataParser,
  AvatarController.AddAvatar
);
AvatarRoute.put(
  "/update",
  authentication,
  formDataParser,
  AvatarController.UpdateAvatar
);

module.exports = AvatarRoute;
