const express = require("express");
const Request = require("../models/Request");

const router = express.Router();

// Send learning request
router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, skillId } = req.body;

    const request = new Request({
      senderId,
      receiverId,
      skillId,
    });

    await request.save();

    res.status(201).json({
      message: "Learning request sent successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send request",
    });
  }
});

// Get requests received by a user
router.get("/received/:userId", async (req, res) => {
  try {
    const requests = await Request.find({
      receiverId: req.params.userId,
    })
      .populate("senderId", "name email")
      .populate("skillId", "name");

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get requests",
    });
  }
});
// Update request status
router.put("/:requestId", async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findByIdAndUpdate(
      req.params.requestId,
      { status },
      { new: true }
    );

    res.json({
      message: `Request ${status} successfully`,
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update request",
    });
  }
});

module.exports = router;