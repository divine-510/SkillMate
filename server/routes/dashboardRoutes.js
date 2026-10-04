const express = require("express");
const Skill = require("../models/Skill");
const Request = require("../models/Request");
const Review = require("../models/Review");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const totalSkills = await Skill.countDocuments({
      userId: userId,
    });

    const totalRequests = await Request.countDocuments({
      receiverId: userId,
    });

    const acceptedRequests = await Request.countDocuments({
      receiverId: userId,
      status: "accepted",
    });

    const reviews = await Review.find({
      reviewedUserId: userId,
    });

    let averageRating = 0;

    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );

      averageRating = (totalRating / reviews.length).toFixed(1);
    }

    res.json({
      totalSkills,
      totalRequests,
      acceptedRequests,
      averageRating,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
});

module.exports = router;