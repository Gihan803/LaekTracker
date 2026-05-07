const express = require("express");
const router = express.Router();
const { closeMonth, getSavedMonths, getMonthDetail, deleteMonth } = require("../controllers/monthController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getSavedMonths);
router.route("/close").post(protect, closeMonth);
router.route("/:id").get(protect, getMonthDetail).delete(protect, deleteMonth);

module.exports = router;
