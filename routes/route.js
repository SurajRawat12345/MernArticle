const express = require('express');
const router = express.Router();
const { Test,createArticle,ReadArticle,oneArticle,halfUpdate,updateArticle,deleteArticle } = require('../controllers/controller')
// Routes
router.get('/', Test);
router.post('/publish', createArticle);
router.get('/all', ReadArticle);
router.get('/article/:id', oneArticle);
router.patch('/article/:id', halfUpdate);
router.put('/article/:id', updateArticle);
router.delete('/article/:id',deleteArticle);

module.exports = router;