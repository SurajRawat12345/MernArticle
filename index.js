require('dotenv').config()
const express = require('express');
const port = process.env.PORT || 8000;
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const Route = require('./routes/route');
const UserRoutes = require('./routes/user');

// for deprication warning ........
mongoose.set('strictQuery', false); 

// Mongo DB Connection ..........
const dburi = 'mongodb://localhost:27017/Articles';
mongoose.connect(dburi , {useNewUrlParser : true , useUnifiedTopology : true})
.then((result) => {
    console.log("Connected To DB");
    app.listen(port , () => {
        console.log(`Server is running on port ${port}`);
    })
})
.catch((err) => console.log(err));

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Routes
app.use('/user' , UserRoutes);
app.use(Route);