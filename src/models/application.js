const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    intern: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Intern",
      autopopulate: {
        select: "_id firstName lastName",
        maxDepth: 1,
      },
    },
    status: String,
    score: Number,
    isScored: Boolean,
  },
  { id: false, timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
