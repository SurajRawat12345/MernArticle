const express = require('express');
const { isValidObjectId } = require('mongoose');
const Article = require('../models/schema');
const router = express.Router();

router.get('/' , (req,res) => {
    res.json({message : "Hello guys I am back"});
})

 /* ---------- CREATE ------------- */
router.post('/publish' , (req,res) => {
    const article = new Article(req.body);
    article.save()
    .then((result) => {
        console.log("Added Successfully");
        res.send("Added Successfull");
    })
    .catch((err) => {
        res.json({message : err});
    })
})

/* ----------- READ --------------- */
router.get('/all' , (req,res) => {
    Article.find().sort({createdAt : -1})
    .then((result) => {
        res.json(result);
        console.log("Received all data");
    })
    .catch((err) => {
        console.log(err);
    })
}) 

/* ------------ GET REQUEST FOR SINGLE ------------ */
router.get('/article/:id', (req,res) => {
    const id = req.params.id;
    if(isValidObjectId(id)){
        Article.findById(id)
        .then((result)=> {
            res.json(result);
            console.log("Article found");
        })
        .catch((err) => {
            console.log(err);
        })
    }
    else{
        res.json({message : "Not Valid id"});
    }

}) 

/* ------------ PARTIAL UPDATE -------------- */
router.patch('/article/:id', (req,res) => {
    const update = req.body;
    const id = req.params.id;
    if(isValidObjectId(id)){
        Article.findByIdAndUpdate({_id : id} , { $set : update})
        .then((result)=> {
            res.json(result);
            console.log("Partially Updated Successfully");
        })
        .catch((err) => {
            console.log(err);
        })
    }
    else{
        res.json({message : "Not a valid id"});
    }
}) 

/* ------------ UPDATE(Complete) ---------------- */
router.put('/article/:id', (req,res) => {
    const updates = req.body;
    const id = req.params.id;
    if(isValidObjectId(id)){
        Article.findByIdAndUpdate({_id : id} , {$set : updates})
        .then((result)=> {
            res.json(result);
            console.log("Fully Updated Successfully");
        })
        .catch((err) => {
            console.log(err);
        })
    }
    else{
        res.json({message : "Not a valid id"});
    }
}) 

/* -------------- DELETE ------------- */
router.delete('/article/:id' , (req,res) => {
    const id = req.params.id;
    if(isValidObjectId(id)){
        Article.findByIdAndDelete(id)
        .then((result) => {
            res.json({message : "Deleted successfully"});
            console.log("Article deleted");
        })
        .catch((err) => {
            console.log(err);
        })
    }
})
module.exports = router;