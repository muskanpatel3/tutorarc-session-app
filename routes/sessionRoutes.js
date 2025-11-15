const express = require("express");
const router = express.Router();
const { startSession } = require("../controllers/sessionController");

router.post("/start-session", startSession);

module.exports = router;
