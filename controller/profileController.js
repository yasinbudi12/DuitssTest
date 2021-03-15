const { User, Profile } = require("../schema/index");
class ProfileController {
  static async GetFullDetail(req, res) {
    try {
      const { body } = req;
      const UserData = await User.findOne({ PhoneNumber: body.PhoneNumber })
        .select("PhoneNumber")
        .populate("Profile")
        .populate("Avatar")
        .exec();
      return res.status(200).json({
        msg: "Get Full Detail Complete",
        data: UserData,
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Get Full Detail Failed",
        err: error.message,
      });
    }
  }

  static async UpdateProfile(req, res) {
    try {
      const { body } = req;
      const query = {
        Email: "",
        FirstName: "",
        LastName: "",
      };
      const userExist = await User.findById(body.authenticated._id).populate(
        "Profile"
      );
      // console.log(userExist);
      const ProfileData = await Profile.findById(userExist.Profile._id).exec();
      if (body.Email) ProfileData.Email = body.Email;
      if (body.FirstName) ProfileData.FirstName = body.FirstName;
      if (body.LastName) ProfileData.LastName = body.LastName;
      await ProfileData.save();
      return res.status(200).json({
        msg: "Update Profile Success",
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Update Profile Failed",
        err: error.message,
      });
    }
  }
}
module.exports = ProfileController;
