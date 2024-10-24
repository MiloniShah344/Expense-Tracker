let express = require('express')
let cors = require('cors')
require('./dbConnect')
let expenseRouter = require('./Router/expenseRouter')
require('dotenv').config()
let app = express()

app.use(express.json())
app.use(cors())
app.use('/expense', expenseRouter)

app.listen(process.env.PORT, (err)=>{
    if(!err){
        console.log("Server running on 8000")
    }else{
        console.log("Error", err)
    }
})