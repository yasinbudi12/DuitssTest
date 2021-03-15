const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Avatar = mongoose.model(
  "Avatar",
  new Schema({
    Avatar: {
      type: String,
      required: true,
    },
    AvatarType: {
      type: String,
      required: true,
    },
    owner: { type: "ObjectId", ref: "User" },
  }),
  "avatars"
);

module.exports = Avatar;
