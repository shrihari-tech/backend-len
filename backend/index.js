const express = require('express');
const app = express();
const port = 5000;
const user = require('./Routes/User');
const task = require('./Routes/Task');
const book = require('./Routes/Book');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const env = require('dotenv');

const corsOption = {
    origin: function(origin, callback) {
        const allowedOrigins = [
            'https://backend-len.vercel.app',
            'https://backend-len-frontend.vercel.app'
        ];
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};
env.config();

const cors = require('cors');
app.use(cors(corsOption));


app.use(bodyParser.json());
app.use(express.json());
app.use('/user',user);
app.use('/task',task);
app.use('/book',book);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


app.get('/',(req,res)=>{
    res.send('Hello World');
})


// mongoose.connect('mongodb://localhost:27017/backend',)

mongoose.connect(process.env.MONGO_URI,)
.then(()=>console.log('Connected to MongoDB'))