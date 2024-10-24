const mongoose = require("mongoose")

const expenseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    cred: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Expense", expenseSchema)