const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Intern = require("../models/intern");
const Company = require("../models/company");
const Advert = require("../models/advert");
const Review = require("../models/review");
const config = require("config");
const moment = require("moment");
const { authenticateUser } = require("../../middlewares/autenticateUser");

router.post("/", authenticateUser, async (req, res) => {
  try {
    let { company, intern, score, comment } = req.body;
    const { user } = req;
console.log(req.body)
    if (!user) {
      return res
        .status(401)
        .json({ response: false, message: "You are unauthorized" });
    }
    if (user.role === "company" && !intern) {
      return res
        .status(400)
        .json({ response: false, message: "Intern should be provided" });
    }
    if (user.role === "intern" && !company) {
      return res
        .status(400)
        .json({ response: false, message: "Company should be provided" });
    }
    if (!score) {
      return res
        .status(400)
        .json({ response: false, message: "Score should be provided" });
    }
    if (!comment) {
      return res
        .status(400)
        .json({ response: false, message: "Comment should be provided" });
    }
    let reviewer = user.role
    if (user.role === "company") {
      company = user.company;
    }
    if (user.role === "intern") {
      intern = user.intern;
    }
    if (await Review.exists({ company, intern, reviewer })) {
      return res.status(400).json({
        response: false,
        message: `You have already reviewed this`,
      });
    }
    const review = new Review({
      company,
      intern,
      reviewer,
      score,
      comment,
    });

    await review.save();
    res
      .status(201)
      .json({ response: true, message: "Review created successfully", review });
  } catch (error) {
    res.status(500).json({ response: false, error: error.message });
  }
});

router.get("/companies/:companyId", authenticateUser, async (req, res) => {
  try {
    const { companyId } = req.params;

    const reviews = await Review.find({ company: companyId })
      .populate("company")
      .populate("intern");
    const averageScore =
      reviews.reduce((acc, review) => acc + review.score, 0) / reviews.length ||
      0;

    res.status(200).json({ reviews, averageScore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/interns/:internId", authenticateUser, async (req, res) => {
  try {
    const { internId } = req.params;

    const reviews = await Review.find({ intern: internId })
      .populate("company")
      .populate("intern");
    const averageScore =
      reviews.reduce((acc, review) => acc + review.score, 0) / reviews.length ||
      0;

    res.status(200).json({ reviews, averageScore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;