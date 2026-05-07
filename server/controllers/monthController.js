const MonthRecord = require("../models/MonthRecord");
const Expense = require("../models/Expense");
const User = require("../models/User");

const closeMonth = async (req, res) => {
  try {
    const userId = req.user._id;
    const { leaks } = req.body;

    const user = await User.findById(userId);
    const expenses = await Expense.find({ user: userId });

    const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    const income = user.monthlyIncome || 0;
    const totalSaved = income - totalSpent;
    const isProfit = totalSaved >= 0;

    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthLabel = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const monthKey = `${date.getFullYear()}-${month}`;

    const newRecord = await MonthRecord.create({
      user: userId,
      monthLabel,
      monthKey,
      income,
      totalSpent,
      totalSaved,
      isProfit,
      expenses: expenses.map(e => ({ amount: e.amount, category: e.category, date: e.date, note: e.note })),
      leaks: leaks || [],
    });

    await Expense.deleteMany({ user: userId });

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getSavedMonths = async (req, res) => {
  try {
    const records = await MonthRecord.find({ user: req.user._id }).sort({ closedAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getMonthDetail = async (req, res) => {
  try {
    const record = await MonthRecord.findOne({ _id: req.params.id, user: req.user._id });
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteMonth = async (req, res) => {
  try {
    const record = await MonthRecord.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { closeMonth, getSavedMonths, getMonthDetail, deleteMonth };
