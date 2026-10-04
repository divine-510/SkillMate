const express = require("express");
const Profile = require("../models/Profile");

const router = express.Router();

// Create or update profile
router.post("/save", async (req, res) => {
  try {
    const { userId, bio, skills } = req.body;

    let profile = await Profile.findOne({ userId });

    if (profile) {
      profile.bio = bio;
      profile.skills = skills;
    } else {
      profile = new Profile({
        userId,
        bio,
        skills,
      });
    }

    await profile.save();

    res.json({
      message: "Profile saved successfully",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Profile save failed",
    });
  }
});

// Get profile
router.get("/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.params.userId,
    });

    res.json(profile);
  } catch (error) {
    res.status(500).json({
      message: "Could not get profile",
    });
  }
});

module.exports = router;