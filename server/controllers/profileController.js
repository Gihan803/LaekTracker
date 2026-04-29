const User = require("../models/User");

// @desc    Update user's monthly income
// @route   PUT /api/profile/income
// @access  Private
const updateIncome = async (req, res) => {
  try {
    const { monthlyIncome } = req.body;

    // Validate input
    if (monthlyIncome === undefined || monthlyIncome === null) {
      res.status(400);
      return res.json({ message: "Please provide monthlyIncome" });
    }

    if (typeof monthlyIncome !== "number" || monthlyIncome < 0) {
      res.status(400);
      return res.json({ message: "Monthly income must be a positive number" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { monthlyIncome },
      { new: true }
    ).select("-password");

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        monthlyIncome: user.monthlyIncome,
      });
    } else {
      res.status(404);
      return res.json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateIncome,
};
