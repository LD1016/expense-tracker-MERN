const Transaction =  require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  public
exports.getTransactions = async (req, res, next) => {
    // res.send("GET transactions");
    try {
        const transactions = await Transaction.find();

        return res.status(200).json({
            success: true, 
            count: transactions.length,
            data: transactions
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Post a transaction
// @route   POST /api/v1/transactions
// @access  public
exports.postTransactions = async (req, res, next) => {
    // res.send("POST transactions");
    try {
        const {text, amount} = req.body;

        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true, 
            data: transaction
        });    
    } catch (error) {
        // console.log(error);
        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false, 
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            }); 
        }
    }
}

// @desc    Delete a transaction
// @route   DELETE /api/v1/transactions/:id
// @access  public
exports.deleteTransactions = async (req, res, next) => {
    // res.send("DELETE transactions");
    try {
        const transaction = await Transaction.findById(req.params.id);

        if(!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }
        await transaction.remove();
        return res.status(200).json({
            success: true, 
            data: {} //transaction
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}