const express = require('express')
const router = express.Router();
const {User} = require('../models/User')
const authenticate = require('../lib/authenticate')

//user/signup
router.post('/signup',(req,res)=>{
    const { email, password, name } = req.body
    User.signUp(email, password, name)
    .then(user=>{
        res.send({
            code: 1,
            data: user,
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

//user/signin
router.post('/signin',(req,res)=>{
    const { email, password } = req.body
    User.signIn(email,password)
    .then(user=>{
        res.send({
            code: 1,
            data: user,
            message: ''
        })
    })
    .catch(err=>{
        res.send({
            code: 0,
            data: null,
            message: err.message
        })
    })
}) 

//user/signup/send-friend-request
router.post('/send-friend-request', authenticate, (req,res)=>{
    const { sendUser , receiveUser } = req.body;
    User.sendFriendRequest(sendUser, receiveUser)
    .then(obj => {
        res.send({
            code: 1,
            data: {
                sender : obj.sender,
                receiver: obj.receiver,
                token: req.token
            },
            message: ''
        })
    })
    .catch(err => {
        res.send({
            code: 0,
            data: null,
            message: err
        })
    })
})

//user/accept-friend-request
router.put('/accept-friend-request',authenticate,(req,res)=>{
    const { senderId } = req.body
    const userId = req.userId // req.userId from authenticate 
    res.setHeader('token', req.token);
    User.acceptFriendRequest(userId,senderId)
    .then(obj=>{
        res.send({
            code: 1,
            data: {
                user : obj.user,
                friend: obj.friend
            },
            message: ''
        })
    })
    .catch(err=>{
        res.send({
            code: 0,
            data: null,
            message: err.message
        })
    })
})


//user/cancel-friend-invitation -- Huy loi moi ket ban
router.put('/cancel-friend-invitation',authenticate,(req,res)=>{
    const { senderId } = req.body
    const userId = req.userId // req.userId from authenticate 
    res.setHeader('token', req.token);
    User.cancelFriendInvitation(userId,senderId)
    .then(obj=>{
        res.send({
            code: 1,
            data: {
                user : obj.user,
                friend: obj.friend
            },
            message: ''
        })
    })
    .catch(err=>{
        res.send({
            code: 0,
            data: null,
            message: err.message
        })
    })
})



//user/unfriend
router.put('/unfriend',authenticate,(req,res)=>{
    const { friendId } = req.body
    const userId = req.userId // req.userId from authenticate 
    res.setHeader('token', req.token);
    User.unFriend(userId,friendId)
    .then(obj=>{
        res.send({
            code: 1,
            data: {
                user : obj.user,
                friend: obj.friend
            },
            message: ''
        })
    })
    .catch(err=>{
        res.send({
            code: 0,
            data: null,
            message: err.message
        })
    })
})

// /user/count-friend
router.get("/count-friend", (req, res)=>{
    const userId = req.body.userId;
    User.countFriend(userId)
    .then(obj=>{
        res.send({
            code: 1,
            data: obj,
            message: ''
        })
    })
    .catch(err=>{
        res.send({
            code: 0,
            data: null,
            message: err.message
        })
    })
})


//user/receive-request-friend
router.get("/receive-request-friend", authenticate,  (req, res)=>{
    const userId = req.userId;
    res.setHeader('token', req.token);
    User.receiveRequestFriend(userId)
    .then(obj=>{
        res.send({
            code: 1,
            data: {
                user : obj.user,
                receiveRequests: obj.receiveRequests
            },
            message: ''
        })
    })
    .catch(err=>{
        res.send({
            code: 0,
            data: null,
            message: err.message
        })
    })
})

module.exports = router