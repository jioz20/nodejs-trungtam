const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserModel = require("../models/User").UserModel;
const PostModel = require("../models/Post").PostModel;
const checkObjectId  = require('../lib/checkObjectId');


const CommentSchema = new Schema({
    author : {type:Schema.Types.ObjectId, ref:'user'}, 
    post: {type:Schema.Types.ObjectId, ref:'post'}, 
    content:{ type:String, required:true}, 
    likes: [
        {type:Schema.Types.ObjectId, ref:'user'}
    ],
    replies:[
        {
            author:{type:Schema.Types.ObjectId, ref:'user'},
            content: { type:String, required:true},
            likes:[
                {type:Schema.Types.ObjectId, ref:'user'}
            ],
        }
    ]
})
const CommentModel = mongoose.model('comment',CommentSchema)


class Comment extends CommentModel{

    //create comment
    static createComment(userId, postId, content)
    {
        return new Promise((resolve, reject)=>{
            const checkUserId = checkObjectId(UserModel, userId).catch(err => {return reject( new Error(err))});
            const checkPostId = checkObjectId(PostModel, postId).catch(err => {return reject( new Error(err))});

            if(checkPostId && checkUserId)
            {
                CommentModel.create({
                    author: userId,
                    post: postId,
                    content: content
                })
                .then((comment)=>{
                    return PostModel.findByIdAndUpdate(postId,{
                        $addToSet:{
                            comments: comment._id
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
}
module.exports = {CommentModel, Comment}