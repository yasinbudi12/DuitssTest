const UserRouter = require("express").Router();
const { UserController } = require("../controller/index");

UserRouter.get("/:phone", UserController.CheckPhone);
UserRouter.post("/register", UserController.Register);
UserRouter.post("/login", UserController.Login);
module.exports = UserRouter;
