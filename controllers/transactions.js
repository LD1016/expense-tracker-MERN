// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  public
exports.getTransactions = (req, res, next) => {
    res.send("GET transactions");
}

// @desc    Post a transaction
// @route   POST /api/v1/transactions
// @access  public
exports.postTransactions = (req, res, next) => {
    res.send("POST transactions");
}

// @desc    Delete a transaction
// @route   DELETE /api/v1/transactions/:id
// @access  public
exports.deleteTransactions = (req, res, next) => {
    res.send("DELETE transactions");
}