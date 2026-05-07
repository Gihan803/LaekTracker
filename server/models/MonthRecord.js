const mongoose = require("mongoose");

const monthRecordSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    monthLabel: {
      type: String,
      required: true,
    },
    monthKey: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
      required: true,
      default: 0,
    },
    totalSpent: {
      type: Number,
      required: true,
      default: 0,
    },
    totalSaved: {
      type: Number,
      required: true,
      default: 0,
    },
    isProfit: {
      type: Boolean,
      required: true,
      default: true,
    },
    expenses: [
      {
        amount: Number,
        category: String,
        date: Date,
        note: String,
      }
    ],
    leaks: [
      {
        category: String,
        count: Number,
        totalAmount: Number,
        averageAmount: Number,
        severity: String,
        suggestion: String,
      }
    ],
    closedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MonthRecord", monthRecordSchema);
