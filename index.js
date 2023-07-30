require('dotenv').config()
const express = require('express');
const port = process.env.PORT || 8000;
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const Route = require('./routes/route');
const cors = require('cors');

// for deprication warning ........
mongoose.set('strictQuery', false); 

// Mongo DB Connection ..........
const dburi = process.env.URI;
mongoose.connect(dburi , {useNewUrlParser : true , useUnifiedTopology : true})
.then( console.log("Connected to DB"));

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Routes
app.use(Route);

// Server Listen
app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})