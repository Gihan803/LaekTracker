const express = require("express");
const router = express.Router();
const {
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

// All expense routes are protected
router.route("/").post(protect, addExpense).get(protect, getExpenses);
router.route("/:id").delete(protect, deleteExpense);

module.exports = router;
