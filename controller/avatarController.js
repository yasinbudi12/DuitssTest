const fs = require("fs-extra");
const { User, Avatar } = require("../schema/index");
const jwt = require("jsonwebtoken");
const imageType = require("../middleware/imagetype");

// const minio = require("../middleware/minio");
class AvatarController {
  static async GetAvatarImage(req, res) {
    try {
      // console.log(req.params.id)
      const UserExist = await User.findById(req.params.id)
        .select("_id")
        .populate("Avatar")
        .exec();
      if (
        !fs.existsSync(
          `${process.cwd()}/assets/avatar/${UserExist.Avatar.Avatar}.${
            UserExist.Avatar.AvatarType
          }`
        )
      )
        throw new Error("did not exist");
      const Stream = await fs.createReadStream(
        `${process.cwd()}/assets/avatar/${UserExist.Avatar.Avatar}.${
          UserExist.Avatar.AvatarType
        }`
      );
      // console.log(Stream)
      Stream.on("open", async () => {
        res.statusCode = 200;
        return Stream.pipe(res);
      });
      // Stream.on("error", () => {
      //   return res.end();
      // });
      //   const StreamImage = await minio.getObject(
      //     "Avatar",
      //     `${UserExist.Avatar.Avatar}.${UserExist.Avatar.AvatarType}`
      //   );
      //   return res.pipe(StreamImage);
    } catch (error) {
      // if (!IsExist) await minio.makeBucket("avatar");
      const StreamDefault = fs.createReadStream(
        `${process.cwd()}/assets/AvatarPlaceholder.gif`
      );
      const ImageTypeDefault = "image/gif";
      res.setHeader("Content-Type", ImageTypeDefault);
      StreamDefault.on("open", async () => {
        return StreamDefault.pipe(res);
      });
      StreamDefault.on("error", (err) => {
        return res.end(err);
      });
    }
  }
  static async AddAvatar(req, res) {
    try {
      //   const isExist = await minio.bucketExists("Avatar");
      //   if (!isExist) await minio.makeBucket("Avatar");
      const { files } = req;
      const UserExist = await User.findById(req.authenticated._id)
        .select("_id")
        .populate("Avatar")
        .exec();
      let imgType = imageType(files.Avatar.type);
      const rawData = fs.readFileSync(files.Avatar.path);
      const path = "assets/avatar";
      if (!fs.existsSync(path)) await fs.mkdirSync(path);
      const avatarPath = `${path}/avatar_${UserExist._id}.${imgType}`;
      await fs.writeFile(avatarPath, rawData);
      const AvatarDB = await Avatar.create({
        Avatar: `avatar_${UserExist._id}`,
        AvatarType: imgType,
      });
      UserExist.Avatar = AvatarDB._id;
      await UserExist.save();
      return res.status(200).json({
        msg: "Add Avatar Success",
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Add Avatar Failed",
        err: error.message,
      });
    }
  }
  static async UpdateAvatar(req, res) {
    try {
      // const isExist = await minio.bucketExists("Avatar");
      // if (!isExist) await minio.makeBucket("Avatar");
      const { files, authenticated } = req;
      let UserExist = await User.findById(authenticated._id)
        .select("_id")
        .populate("Avatar")
        .exec();
      console.log(UserExist);
      let imgType = imageType(files.Avatar.type);
      const path = "assets/avatar";
      const rawData = fs.readFileSync(files.Avatar.path);
      const avatarDB = await Avatar.findOne(UserExist.Avatar._id);
      if (
        fs.existsSync(`${path}/avatar_${UserExist._id}.${avatarDB.AvatarType}`)
      )
        await fs.unlink(
          `${path}/avatar_${UserExist._id}.${avatarDB.AvatarType}`
        );
      avatarDB.AvatarType = imgType;
      await avatarDB.save();
      if (!fs.existsSync(path)) await fs.mkdirSync(path);
      const avatarPath = `${path}/avatar_${UserExist._id}.${imgType}`;
      await fs.writeFile(avatarPath, rawData);
      return res.status(200).json({
        msg: "Update Avatar Success",
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Update Avatar Failed",
        err: error.message,
      });
    }
  }
}
module.exports = AvatarController;
