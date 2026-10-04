const express = require("express");
const Skill = require("../models/Skill");

const router = express.Router();

// Add a skill
router.post("/add", async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    const skill = new Skill({
      name,
      description,
      userId,
    });

    await skill.save();

    res.status(201).json({
      message: "Skill added successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add skill",
    });
  }
});

// Get all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().populate("userId", "name");

    res.json(skills);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get skills",
    });
  }
});
// Update a skill
router.put("/:skillId", async (req, res) => {
  try {
    const { name, description } = req.body;

    const skill = await Skill.findByIdAndUpdate(
      req.params.skillId,
      {
        name,
        description,
      },
      { new: true }
    );

    res.json({
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update skill",
    });
  }
});

module.exports = router;