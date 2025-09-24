const express = require("express");
const twilio = require("twilio");
const router = express.Router();
// Twilio client
const client = require("twilio")(process.env.SID, process.env.AUTH);

// Define numbers to send to
const numbers = [
  "+918240216839" // Number 1
   // Number 2
 
];

router.post("/send-sms", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: "Message is required" });
  }

  try {
    // Send SMS to all numbers
    await Promise.all(
      numbers.map((to) =>
        client.messages.create({
          body: message,
          from: process.env.PHONE, // Your Twilio number
          to,
        })
      )
    );

    res.json({ success: true, message: "Messages sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to send messages" });
  }
});

module.exports = router; 