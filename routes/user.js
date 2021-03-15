const UserRouter = require("express").Router();
const { UserController } = require("../controller/index");

UserRouter.post("/register", UserController.Register);
UserRouter.post("/login", UserController.Login);
module.exports = UserRouter;
