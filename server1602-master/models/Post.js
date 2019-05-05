const mongoose = require('mongoose')
const checkObjectId  = require('../lib/checkObjectId')
const UserModel = require("../models/User").UserModel;

const Schema = mongoose.Schema

const PostSchema = new Schema({
    author : { type: Schema.Types.ObjectId, ref:'user'}, 
    content: {type:String, required:true}, 
    likes:[
        {type: Schema.Types.ObjectId, ref:'user'}
    ], 
    comments: [
        {type: Schema.Types.ObjectId, ref:'comment'}
    ]
})
const PostModel = mongoose.model('post',PostSchema)


class Post extends PostModel {

    //create-post
    static creatPost(userId, postContent)
    {
        return new Promise((resolve, reject)=>{
            const checkUserId = checkObjectId(UserModel, userId).catch(err => {return reject( new Error(err))});
            if(checkUserId)
            {
                Post.create({
                    author: userId,
                    content: postContent,
                }).then(post=>{
                    UserModel.findByIdAndUpdate(userId, 
                        {
                            $addToSet: {
                                posts: post._id
                            }
                        },{
                            new:true
                        })
                        .then(user=>{
                            if(!user)
                            {
                                //remove post
                                PostModel.findByIdAndRemove(post._id)
                                .catch(e => {return reject( new Error(e))});
                            }
                            
                            user = user.toObject();
                            delete user.password;
                            delete user.friends;
                            delete user.receiveRequests;
                            delete user.sendRequests;
                           return resolve({post, user})
                        })
                })
                .catch(err => {return reject( new Error(err))})
            }
        })
    }

    //list-post
    static listPost(userId)
    {
        return new Promise((resolve, reject)=>{
            const checkUserId = checkObjectId(UserModel, userId).catch(err => {return reject( new Error(err))});
            if(checkUserId)
            {
                UserModel.findById(userId, {email: 1, _id: 0})
                    .select(['name'])
                    .populate('posts', {content: 1, _id: 1})
                    .then(user => {
                        user = user.toObject();
                        delete user.password;
                        return resolve(user);
                    })
                    .catch(err => {return reject( new Error(err))})
            }
        })
    }


    //like-post
    static likePost(userId, postId)
    {
        return new Promise((resolve, reject)=>{
            const checkUserId = checkObjectId(UserModel, userId).catch(err => {return reject( new Error(err))});
            const checkPostId = checkObjectId(PostModel, postId).catch(err => {return reject( new Error(err))});

            if(checkUserId && checkPostId)
            {
                UserModel.findById(userId)
                .then(user=>{
                    //update post : likes
                    return Post.findByIdAndUpdate(postId,{
                        $addToSet:{
                            likes: user
                        }
                    },{new:true})
                })
                .then(result => {
                    
                    return resolve(result);
                })
                .catch(err => {return reject( new Error(err))});
            }
        })
    }


    //Dislike
    static likePost(userId, postId)
    {
        return new Promise((resolve, reject)=>{
            const checkUserId = checkObjectId(UserModel, userId).catch(err => {return reject( new Error(err))});
            const checkPostId = checkObjectId(PostModel, postId).catch(err => {return reject( new Error(err))});

            if(checkUserId && checkPostId)
            {
                UserModel.findById(userId)
                .then(user=>{
                    //update post : likes
                    return Post.findByIdAndUpdate(postId,{
                        $pull:{
                            likes: user._id
                        }
                    },{new:true})
                })
                .then(result => {
                    
                    return resolve(result);
                })
                .catch(err => {return reject( new Error(err))});
            }
        })
    }


    //Update post phai kiem tra thang author
    static updatePost(userId, postId, newContent)
    {
        return new Promise((resolve, reject)=>{
            const checkPostId = checkObjectId(PostModel, postId).catch(err => {return reject( new Error(err))});
            const checkUserId = checkObjectId(UserModel, userId).catch(err => {return reject( new Error(err))});
            if(checkPostId && checkUserId)
            {
                UserModel.findById(userId)
                .then(user => {
                    if(!user)
                        return reject( new Error("Cannot find user"));
                    
                   Post.findOneAndUpdate({_id: postId, author: user._id},  
                    {
                        $set : {
                            content : newContent
                        }
                    }, {new: true})
                    .then(post => {
                        return resolve(post);
                    })
                })
                .catch(err => {return reject( new Error(err))});
            }
        })
    }
}


module.exports = {PostModel, Post}