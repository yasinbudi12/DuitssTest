const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    PhoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    PIN: {
      type: String,
      required: true,
    },
    Profile: { type: "ObjectId", ref: "Profile" },
    Avatar: { type: "ObjectId", ref: "Avatar" },
  }),
  "User"
);

module.exports = User;
