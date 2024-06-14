const express = require("express");
const router = express.Router();
const Matches = require("../models/match");

const { authenticateUser } = require("../../middlewares/autenticateUser");

router.get("/", authenticateUser, async (req, res) => {
  try {
    const { user } = req;

    const matches = await Matches.find({
      intern_id: user.id, // Assuming user._id matches intern_id
    });

    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
