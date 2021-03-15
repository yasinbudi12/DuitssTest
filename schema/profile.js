const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Profile = mongoose.model(
  "Profile",
  new Schema({
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    FirstName: {
      type: String,
      required: true,
      unique: true,
    },
    LastName: {
      type: String,
      required: true,
      unique: true,
    },
  }),
  "Profile"
);

module.exports = Profile