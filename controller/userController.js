const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
class userController {
  static Register(req, res) {
    try {
      return res.status(200).json({
        msg: "Register Success",
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Register Failed",
        error: error.message,
      });
    }
  }
  static async Login(req, res) {
    try {
      const data = await jwt.sign({ msg: "token" }, secret);
      return res.status(200).json({
        msg: "Login Success",
        token: data
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Login Failed",
        error: error.message,
      });
    }
  }
  static getUser(req, res) {
    try {
      return res.status(200).json({
        msg: "Get User Success",
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Get User Failed",
        error: error.message,
      });
    }
  }
  static updateUser(req, res) {
    try {
      return res.status(200).json({
        msg: "Update User Success",
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Update User Failed",
        error: error.message,
      });
    }
  }
  static deleteUser(req, res) {
    try {
      return res.status(200).json({
        msg: "Delete User Success",
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Delete User Failed",
        error: error.message,
      });
    }
  }
}
module.exports = userController;
