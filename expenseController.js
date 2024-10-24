let Expense = require("../Model/expenseSchema")

const createExpense = (req,res) =>{
    try{
        console.log(req.body)
        let edata = new Expense (req.body)
        edata.save().then((val)=>{
            console.log(val)
            res.send({
                issSuccess: true,
                message: "Expense created",
                data: val
            })
        })
        .catch((err)=>{
            console.log(err)
            res.send({
                issSuccess: false,
                message: "In try block",
                Error: err
            })
        })
    }catch(err){
        console.log(err)
        res.send({
            issSuccess: false,
            message: "Not in try block",
            Error: err
        })
    }
}

const getExpense = (req, res) =>{
    try{
        console.log(req.body)
        Expense.find()
        .then((val)=>{
            res.send({
                issSuccess: true,
                message: "Successful",
                data: val
            })
        }).catch((err)=>{
            res.send({
                issSuccess: true,
                message: "Error in try",
                Error: err
            })
        })
    }catch(err){
        res.send({
            issSuccess: true,
            message: "Error out of try block",
            Error: err
        })
    }
}

const updateExpense = (req, res)=>{
    try{
        Expense.updateOne({_id: req.query._id}, req.body)
        .then((data)=>{
            console.log(data)
            res.send({
                isSuccess: true,
                message: data
            })
        }).catch((err)=>{
            res.send({
                isSuccess: false,
                message: err
            })
        })
    }catch(err){
        res.send({
            isSuccess: false,
            message: err
        })
    }
}

const deleteExpense = (req, res)=>{
    try{
        Expense.deleteOne({_id: req.query._id})
        .then((data)=>{
            console.log(data)
            res.send({
                isSuccess: true,
                message: data
            })
        }).catch((err)=>{
            res.send({
                isSuccess: false,
                message: err
            })
        })
    }catch(err){
        res.send({
            isSuccess: false,
            message: err
        })
    }
}

module.exports = {createExpense, getExpense, deleteExpense, updateExpense}