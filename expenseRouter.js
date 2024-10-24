let express = require('express')
const {createExpense, getExpense, deleteExpense, updateExpense} = require('../Controller/expenseController')

let router = express.Router()
router.post('/createExpense', createExpense)
router.get('/getExpense', getExpense)
router.delete('/deleteExpense', deleteExpense)
router.put('/updateExpense', updateExpense)

module.exports = router