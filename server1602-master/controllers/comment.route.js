const express = require('express')
const router = express.Router();
const authenticate = require('../lib/authenticate')
const {Comment} = require('../models/Comment');


//post/create-comment
router.post("/create-comment", authenticate, (req,res)=>{
    const {cmtContent, postId} = req.body;
    const userId = req.userId;

    Comment.createComment(userId, postId, cmtContent)
    .then(cmt => {
        res.send({
            code: 1,
            data: cmt,
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