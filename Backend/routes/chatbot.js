const express = require("express");
const router = express.Router();

const { askAI } = require("../services/pythonService");

router.post("/chat", async (req, res) => {

  try {

    const { message } = req.body;

    const reply = await askAI(message);

    res.json({ reply });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "AI service unavailable"
    });

  }

});

module.exports = router;