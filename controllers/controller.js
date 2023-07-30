const { isValidObjectId } = require('mongoose');
const Article = require('../models/schema');


const Test = (req,res) => {
    res.json({message : "Hello guys I am back"});
}

 /* ---------- CREATE ------------- */
const createArticle = (req,res) => {
    const article = new Article(req.body);
    article.save()
    .then((result) => {
        //console.log("Added Successfully");
        res.send("Added Successfull");
    })
    .catch((err) => {
        res.json({message : err});
    })
}

/* ----------- READ --------------- */
const ReadArticle = (req,res) => {
    Article.find().sort({createdAt : -1})
    .then((result) => {
        res.json(result);
        //console.log("Received all data");
    })
    .catch((err) => {
        res.json({message : err});
    })
} 

/* ------------ GET REQUEST FOR SINGLE ------------ */
const oneArticle = (req,res) => {
    const id = req.params.id;
    if(isValidObjectId(id)){
        Article.findById(id)
        .then((result)=> {
            res.json(result);
            //console.log("Article found");
        })
        .catch((err) => {
            console.log(err);
        })
    }
    else{
        res.json({message : "Not Valid id"});
    }

}

/* ------------ PARTIAL UPDATE -------------- */
const halfUpdate = (req,res) => {
    const update = req.body;
    const id = req.params.id;
    if(isValidObjectId(id)){
        Article.findByIdAndUpdate({_id : id} , { $set : update})
        .then((result)=> {
            res.json(result);
            //console.log("Partially Updated Successfully");
        })
        .catch((err) => {
            res.json({message : err});
        })
    }
    else{
        res.json({message : "Not a valid id"});
    }
}

/* ------------ UPDATE(Complete) ---------------- */
const updateArticle = (req,res) => {
    const updates = req.body;
    const id = req.params.id;
    if(isValidObjectId(id)){
        Article.findByIdAndUpdate({_id : id} , {$set : updates})
        .then((result)=> {
            res.json(result);
            //console.log("Fully Updated Successfully");
        })
        .catch((err) => {
            res.json({message : err});
        })
    }
    else{
        res.json({message : "Not a valid id"});
    }
}

/* -------------- DELETE ------------- */
const deleteArticle = (req,res) => {
    const id = req.params.id;
    if(isValidObjectId(id)){
        Article.findByIdAndDelete(id)
        .then((result) => {
            res.json({message : "Deleted successfully"});
            //console.log("Article deleted");
        })
        .catch((err) => {
            res.json({message : err});
        })
    }
}
module.exports = {
    Test,
    createArticle,
    ReadArticle,
    oneArticle,
    halfUpdate,
    updateArticle,
    deleteArticle
}