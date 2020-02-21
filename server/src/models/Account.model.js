/**
 * Model users or account for project
 * author: Sky Albert
 * date up: 21/05/2019
 * date to: ___
 * team: BE-RHP
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const rcrypt = require("../helpers/secures/rcrypt");

const remainingAdditionalPostSchema = new Schema({
  quantity: Number,
  expireDate: Date
});

const AccountSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  phone: String,
  status: Boolean,
  code: String,
  membershipPackage: {
    type: String,
    default: "free"
  },
  expireDate: Date,
  keywords: Array,
  maxAccountFb: {
    type: Number,
    default: 2
  },
  presenter: { type: String, default: "" },
  imageAvatar: String,
  ip: [],
  _role: {
    type: Schema.Types.ObjectId,
    ref: "Role"
  },
  _server: {
    type: Schema.Types.ObjectId,
    ref: "Server"
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  keywordSearch: [
    {
      content: String,
      time: Date
    }
  ],
  limitPostPerDay: {
    type: Number,
    default: 1
  },
  totalPostedToday: {
    type: Number,
    default: 0
  },
  remainingAdditionalPost: [ remainingAdditionalPostSchema ],
  permission: {
    type: [ String ]
  },
  other01: String, // id of phpMyadmin from older server
  other02: String,
  updated_at: Date
});


AccountSchema.pre("save", async function(next) {
  try {
    this.password = await rcrypt.encode(this.password, 10);
    // eslint-disable-next-line camelcase
    this.updated_at = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// =================== METHODS ========================= //

AccountSchema.methods.isValidPassword = async function(newPassword) {
  try {
    const password = this.password;

    return await rcrypt.unlock(newPassword, password);
  } catch (error) {
    throw new Error(error);
  }
};

// eslint-disable-next-line one-var
const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
