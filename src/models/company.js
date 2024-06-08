const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: {
        select: "_id username email",
        maxDepth: 1,
      },
    },
    companyName: String,
    about: String,
    phoneNumber: String,
    faxNumber: String,
    address: String,
    sector: String,
    taxNumber: String,
  },
  { id: false, timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
