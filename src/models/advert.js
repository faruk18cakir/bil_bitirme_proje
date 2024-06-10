const mongoose = require("mongoose");

const advertSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      autopopulate: {
        select: "_id companyName",
        maxDepth: 1,
      },
    },
    title: String,
    field: String,
    requirements: String,
    foreignLanguages: String,
    department: String,
  },
  { id: false, timestamps: true }
);

const Advert = mongoose.model("Advert", advertSchema);

module.exports = Advert;
