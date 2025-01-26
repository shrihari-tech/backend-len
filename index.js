const express = require('express');
const app = express();
const port = 5000;
const user = require('./Routes/User');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());
app.use(express.json());
app.use('/user',user);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


app.get('/',(req,res)=>{
    res.send('Hello World');
})


mongoose.connect('mongodb://localhost:27017/backend',)
.then(()=>console.log('Connected to MongoDB'))