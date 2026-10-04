const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// Add review
router.post("/add", async (req, res) => {
  try {
    const {
      reviewerId,
      reviewedUserId,
      rating,
      comment,
    } = req.body;

    const review = new Review({
      reviewerId,
      reviewedUserId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add review",
    });
  }
});

// Get reviews for a user
router.get("/:userId", async (req, res) => {
  try {
    const reviews = await Review.find({
      reviewedUserId: req.params.userId,
    }).populate("reviewerId", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get reviews",
    });
  }
});

module.exports = router;