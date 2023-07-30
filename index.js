require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Route = require('./routes/route.js');

const app = express();
const port = process.env.PORT || 8000;

// Connection
mongoose.set('strictQuery', false); 
mongoose.connect(process.env.MONGO_URI , {useNewUrlParser : true , useUnifiedTopology : true})
.then(console.log("Connected DB"))

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended : true}));

app.get("/" , async(req,res) => {
    res.status(200).json("Hello User")
})

// Routes
app.use('/art', Route);

// Server Listen
app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})