const express = require('express')
const {Post} = require('../models/Post')
const router = express.Router();
const authenticate = require('../lib/authenticate')

//post/create-post
router.post("/create-post", authenticate, (req,res)=>{
    const {content} = req.body;
    const userId = req.userId;
    Post.creatPost(userId, content)
    .then(post => {
        res.send({
            code: 1,
            data: post,
            message: ''
        })
    })
    .catch(error=>{
        res.send({
            code: 0,
            data: null,
            message: error.message
        })
    })
})


//list-post
router.get("/list-post", authenticate, (req,res)=>{
    const userId = req.userId;
    Post.listPost(userId)
    .then(post => {
        res.send({
            code: 1,
            data: post,
            message: ''
        })
    })
    .catch(error=>{
        res.send({
            code: 0,
            data: null,
            message: error.message
        })
    })
})

//like post
router.put("/like-post", authenticate, (req,res)=>{
    const userId = req.userId;
    const postId = req.body.postId;
    Post.likePost(userId, postId)
    .then(post => {
        res.send({
            code: 1,
            data: post,
            message: ''
        })
    })
    .catch(error=>{
        res.send({
            code: 0,
            data: null,
            message: error.message
        })
    })
})


//dislike post
router.put("/dislike-post", authenticate, (req,res)=>{
    const userId = req.userId;
    const postId = req.body.postId;
    Post.likePost(userId, postId)
    .then(post => {
        res.send({
            code: 1,
            data: post,
            message: ''
        })
    })
    .catch(error=>{
        res.send({
            code: 0,
            data: null,
            message: error.message
        })
    })
})


//update-post
router.put("/update-post", authenticate, (req,res)=>{
    const {postId, content} = req.body;
    const userId = req.userId;
    Post.updatePost(userId, postId, content)
    .then(post => {
        res.send({
            code: 1,
            data: post,
            message: ''
        })
    })
    .catch(error=>{
        res.send({
            code: 0,
            data: null,
            message: error.message
        })
    })
})


module.exports = router;