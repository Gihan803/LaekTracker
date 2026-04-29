const express = require("express");
const router = express.Router();
const { updateIncome } = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

// All profile routes are protected
router.put("/income", protect, updateIncome);

module.exports = router;
