const { User, Profile } = require("../schema/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const SALT = process.env.SALT;
class UserController {
  static async Register(req, res) {
    try {
      let { body } = req;
      const query = {
        PhoneNumber: "",
        PIN: "",
      };
      const query1 = {
        Email: "",
        FirstName: "",
        LastName: "",
      };
      const userExist = await User.findOne({ PhoneNumber: body.PhoneNumber });
      if (userExist !== null)
        throw new Error("Phone Number Already Registered");
      if (!body.PhoneNumber) throw new Error("Please Insert Phone Number");
      if (!body.PIN) throw new Error("Please Insert PIN");
      if (body.PIN.length !== 6) throw new Error("PIN must be 6 digits");
      if (!body.Email) throw new Error("Please Insert Email");
      if (!body.FirstName) throw new Error("Please Insert First Name");
      if (!body.LastName) throw new Error("Please Insert Last Name");
      if (body.PhoneNumber) query.PhoneNumber = body.PhoneNumber;
      if (body.Email) query1.Email = body.Email;
      if (body.FirstName) query1.FirstName = body.Email;
      if (body.LastName) query1.LastName = body.LastName;
      query.PIN = await bcrypt.hashSync(body.PIN, Number(SALT));
      const CreateUser = await User.create(query);
      const CreateProfile = await Profile.create(query1);
      console.log(CreateUser);
      const dataUser = await User.findOne({
        PhoneNumber: CreateUser.PhoneNumber,
      });
      dataUser.Profile = CreateProfile._id;
      await dataUser.save();
      return res.status(201).json({
        msg: "Register Success",
      });
    } catch (error) {
      let message = error.message;
      if (message.includes("duplicate key error collection"))
        error.message = "Duplicate Key Detected";
      if (message.includes("required"))
        error.message = "Please Fill it Correctly";
      return res.status(400).json({
        msg: "Register Failed",
        err: error.message,
      });
    }
  }
  static async Login(req, res) {
    try {
      let { body } = req;
      const userExist = await User.findOne({
        PhoneNumber: body.PhoneNumber,
      }).exec();
      if (userExist === null) throw new Error("Phone Number Does Not Exist");
      const verifyPin = await bcrypt.compareSync(body.PIN, userExist.PIN);
      if (!verifyPin) throw new Error("Wrong Pin");
      const data = {
        _id: userExist._id,
        PhoneNumber: userExist.PhoneNumber,
        Profile: userExist.Profile,
      };
      const token = jwt.sign(data, SECRET, { expiresIn: "1h" });
      return res.status(200).json({
        msg: "Login Success",
        token,
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Login Failed",
        err: error.message,
      });
    }
  }
  static async CheckPhone(req, res) {
    try {
      const PhoneNumber = req.params.phone;
      const isExist = await User.findOne({ PhoneNumber: PhoneNumber });
      if (isExist) {
        return res.status(200).json({
          msg: "Check Number Success",
          data: true,
        });
      } else {
        return res.status(200).json({
          msg: "Check Number Success",
          data: false,
        });
      }
    } catch (error) {
      return res.status(400).json({
        msg: "Check Number Failed",
        err: error.message,
      });
    }
  }
}

module.exports = UserController;
