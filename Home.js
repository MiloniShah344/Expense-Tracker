import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar';
import pic from './pic.jpg'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
// import { FocusTrap } from '@mui/base/FocusTrap';


function Home() {

    const [data, setData] = useState({})
    const [arr, setArr] = useState([])
    const [id, setId] = useState()
    const [update, doupdate] = useState(true)
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8000/expense/getExpense')
            .then((res) => {
                console.log("res.data", res.data.data)
                setArr(res.data.data)
            }).catch((err) => {
                console.log("Error", err)
            })
        console.log("In useEffect", arr)
    }, [update])

    const handleChange = (e, type) => {
        // const name = e.target.name
        // setData({ ...data, [name]: e.target.value })

        if (type == "name") {
            setData({ ...data, name: e.target.value })
        }
        else if (type == "amount") {
            setData({ ...data, amount: e.target.value })
        }
        else if (type == "desc") {
            setData({ ...data, desc: e.target.value })
        }
        else if (type == "cred") {
            setData({ ...data, cred: e.target.value })
        }
    }

    const handleAdd = () => {
        console.log(data)
        axios.post('http://localhost:8000/expense/createExpense', data)
            .then((res) => {
                doupdate(!update)
          
            }).catch((err) => {
                console.log("Error", err)
            })
        setData({ name: "", amount: "", desc: "", cred: "" })
    }

    const handleUpdateButton = (id) => {
        console.log("handleUpdateButton")
        console.log("handleUpdateButton id:", id)
        axios.get('http://localhost:8000/expense/getExpense')
        .then((res) => {
            // console.log("res.data.data", res.data.data)
            let data=res.data.data
            let dataid=data.find((val)=>(
                val._id==id
            ))
            console.log("dataid", dataid)
            setData(dataid)
            setId(dataid._id)
        }).catch((err) => {
            console.log("Error", err)
        })
    }

    const handleUpdateMain = (id) => {
        console.log("handleUpdateMain", id)
        axios.put(`http://localhost:8000/expense/updateExpense?_id=${id}`, data)
            .then((res) => {
                doupdate(!update)
                window.alert("Expense Updated!")
            }).catch((err) => {
                console.log("Error", err)
            })
        setData({ name: "", amount: "", desc: "", cred: "" })
    }

    const handleDelete = (id) => {
        console.log("handleDelete id:", id)
        axios.delete(`http://localhost:8000/expense/deleteExpense?_id=${id}`)
            .then((res) => {
                doupdate(!update)
                window.alert("Expense deleted!")
            }).catch((err) => {
                console.log("Error", err)
            })
        
    }

    return (
        <div class="head" style={{ overflow: 'hidden' }}>
            <Navbar />
            <br /><br /><br />
            <div class="row" >
                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '85ch' } }}
                        noValidate
                        autoComplete="off"
                    >
                      
                        <TextField name='name' value={data.name} onChange={(e) => { handleChange(e, "name") }} id="outlined-basic" label="Expense Name" variant="outlined" />
                        <TextField name='amount' value={data.amount} onChange={(e) => { handleChange(e, "amount") }} id="outlined-basic" label="Amount" variant="outlined" />
                        <TextField name='desc' value={data.desc} onChange={(e) => { handleChange(e, "desc") }} id="outlined-basic" label="Description" variant="outlined" />
               

                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                sx={{ margin: 1 }}
                            >
                                <FormControlLabel value="credit" onChange={(e) => { handleChange(e, "cred") }} checked={data.cred == "credit"} control={<Radio />} label="Credit" />
                                <FormControlLabel value="debit" onChange={(e) => { handleChange(e, "cred") }} checked={data.cred == "debit"} control={<Radio />} label="Debit" />
                            </RadioGroup>
                        </FormControl>


                        <Stack spacing={2} direction="row">
                            <Button onClick={() => { handleAdd() }} variant="contained" color='success'>Add</Button>
                            <Button onClick={() => {handleUpdateMain(id)}} variant="contained" color='primary'>Update</Button>
                        </Stack>
                        {/* {if(alert){
                            <Alert severity="success">This is a success alert — check it out!</Alert>}
                        }} */}
                    </Box>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-4">
                    <img src={pic} alt="Image" />
                </div>
                <div class="col-md-1"></div>
            </div><br />
            <div>
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            {/* <th>Id</th> */}
                            <th>Expense Name</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Credit / Debit</th>
                            <th>Actions</th>
                        </tr>
                        {arr.map((val) => (
                            <tr>
                                {/* <td>{val._id}</td> */}
                                <td>{val.name}</td>
                                <td>{val.amount}</td>
                                <td>{val.desc}</td>
                                <td>{val.cred}</td>
                                <td>
                                    <Stack spacing={2} direction="row" sx={{ paddingLeft: '30%' }}>
                                        <Button onClick={(e) => { handleUpdateButton(val._id) }} variant="contained" color='primary'>Update</Button>
                                        <Button onClick={(e) => { handleDelete(val._id) }} variant="contained" color='error'>Delete</Button>
                                    </Stack>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home