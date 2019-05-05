const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash, compare } = require('../lib/bcrypt')
const { sign, verify } = require('../lib/jwt')
const  checkObjectId  = require('../lib/checkObjectId')

const UserSchema = new Schema({
    email: {type:String, required:true, unique:true}, 
    password : {type:String, required:true}, 
    name: String, 
    posts: [
        {type:Schema.Types.ObjectId, ref:'post'}
    ], 
    friends:[
        {type:Schema.Types.ObjectId, ref:'user'}
    ], 
    receiveRequests:[
        {type:Schema.Types.ObjectId, ref:'user'}
    ], 
    sendRequests:[
        {type:Schema.Types.ObjectId, ref:'user'}
    ]
})
const UserModel = mongoose.model('user',UserSchema)

class User extends UserModel{

    //dang ky
    static signUp(email, password, name)
    {
        return new Promise((resolve, reject) => {
            UserModel.findOne({email})
            .then(checkUser => {
                if(checkUser)
                    return reject(new Error('Email existed!'))  
                else
                {
                    hash(password)
                    .then(hashPassword => {      
                        return UserModel.create ({
                                email, password: hashPassword, name
                            });
                    })
                    .then(user => {
                        if(!user)
                                return reject(new Error('Please try again!'))
                        return resolve({_id : user._id, email : user.email, name: user.name})
                    })
                    .catch(err => {
                        return reject(new Error('Please try again!'))
                    })        
                }
            })
            .catch(err => {
                return reject(new Error('Please try again!'))
            })  
        })
    }


    //Dang nhap
    static signIn(email, password){
        return new Promise((resolve, reject) => 
        {
            UserModel.findOne({email})
            .then(user => {
                if(!user) 
                    return reject(new Error('Can not find user!'));
                else
                {
                    compare(password,user.password)
                    .then(checkPassword => {
                        if(checkPassword)
                        {
                            sign({_id:user._id})
                            .then(token => {
                                const userInfo = user.toObject();
                                delete userInfo.password;
                                userInfo.token = token;
                                return resolve(userInfo);
                            })
                            .catch(err => {return reject(new Error(err.message))})                  
                        }
                        else
                            return reject(new Error("User or Password incorrect"))
                    })
                    .catch(err => {
                        return reject(new Error(err.message))
                    })
                }
            })
            .catch(err => {
                return reject(new Error(err.message))
            })
     })
    }


    static sendFriendRequest(idSender, idReceiver){
        // update sender
        return new Promise((resolve, reject)=>{
            UserModel.findByIdAndUpdate(idSender, {
                $addToSet:{
                            sendRequests: idReceiver
                        }
            }, {new :true})
            .then(sender => {               
                if(!sender)
                    return reject(new Error ('Can not find user!'))
                
                    // update receiver
                UserModel.findByIdAndUpdate(idReceiver, {
                    $addToSet:{
                        receiveRequests: idSender
                    }
                })
                .then(receiver => {
                   
                    if(!receiver)
                    {
                       
                        UserModel.findByIdAndUpdate(idSender, {
                            $pull: {
                                sendRequests: idReceiver
                            }
                        })
                        return reject(new Error ('Can not find user!'))
                    }
                    sender = sender.toObject()
                    receiver = receiver.toObject()

                    delete sender.password;
                    delete receiver.password;
                    return resolve({sender, receiver});
                }) 
               
            })
            .catch(err => {
                return reject(new Error (err.message))
            })
        })
    }


    //Chap nhan loi moi ket ban
    static acceptFriendRequest(userId, senderId){
        return new Promise((resolve, reject)=>{
            const checkUserId = checkObjectId(UserModel, userId).catch(err => {return reject( new Error(err))});
            const checkSenderId = checkObjectId(UserModel, senderId).catch(err => {return reject( new Error(err))});

            if(checkUserId && checkSenderId)
            {
                //Update nguoi gui vao danh sach ban be va xoa loi moi
                UserModel.findByIdAndUpdate(userId,{
                    $addToSet:{
                        friends: senderId
                    },
                    $pull:{
                        receiveRequests: senderId
                    }
                    },{new:true})
                    .then(user => {
                        if(!user)
                            return reject(new Error('Can not find/update user!'));
                             //Update nguoi nhan vao danh sach ban be va xoa loi gui
                            UserModel.findByIdAndUpdate(senderId,{
                                $addToSet:{
                                    friends: userId
                                },
                                $pull:{
                                    sendRequests: userId
                                }
                            },{new:true})
                            .then(friend => {
                                if(!friend) 
                                    return reject(new Error('Can not find/update user!'));
                                
                                friend = friend.toObject()
                                user = user.toObject()
                                delete friend.password
                                delete user.password
                                return resolve({ user, friend });
                            })
                    })
                    .catch(err => {
                        {return reject( new Error(err))}
                    })
            }
        })
    }

    //Hủy lời mời kết bạn phía người nhận
    static cancelFriendInvitation(userId, senderId){
        return new Promise((resolve, reject)=>{
            const checkUserId = checkObjectId(UserModel, userId).catch(err => {return reject( new Error(err))});
            const checkSenderId = checkObjectId(UserModel, senderId).catch(err => {return reject( new Error(err))});

            if(checkUserId && checkSenderId)
            {
                //Update nguoi gui vao danh sach ban be va xoa loi moi
                UserModel.findByIdAndUpdate(userId,{
                    $pull:{
                        receiveRequests: senderId
                    }
                    },{new:true})
                    .then(user => {
                        if(!user)
                            return reject(new Error('Can not find/update user!'));
                             //Update nguoi nhan vao danh sach ban be va xoa loi gui
                            UserModel.findByIdAndUpdate(senderId,{
                                $pull:{
                                    sendRequests: userId
                                }
                            },{new:true})
                            .then(cancelFriend => {
                                if(!cancelFriend) 
                                    return reject(new Error('Can not find/update user!'));
                                
                                cancelFriend = cancelFriend.toObject()
                                user = user.toObject()
                                delete cancelFriend.password
                                delete user.password
                                return resolve({ user, cancelFriend });
                            })
                    })
                    .catch(err => {
                        {return reject( new Error(err))}
                    })
            }
        })
    }

    //Xoa ban
    static unFriend(userId, friendId)
    {
        return new Promise((resolve, reject)=>{
            const checkUserId = checkObjectId(UserModel, userId).catch(err => {return reject( new Error(err))});
            const checkFriendId = checkObjectId(UserModel, friendId).catch(err => {return reject( new Error(err))});

            if(checkUserId && checkFriendId)
            {
                //Update ban be
                UserModel.findByIdAndUpdate(userId,{
                    $pull:{
                        friends: friendId
                    }
                    },{new:true})
                    .then(user => {
                        if(!user)
                            return reject(new Error('Can not find/update user!'));                       
                        UserModel.findByIdAndUpdate(friendId,{
                            $pull:{
                                friends: userId
                            }
                        },{new:true})
                        .then(deleteFriend => {
                            if(!deleteFriend) 
                                return reject(new Error('Can not find/update user!'));
                            
                            deleteFriend = deleteFriend.toObject()
                            user = user.toObject()
                            delete deleteFriend.password
                            delete deleteFriend.password
                            return resolve({ user, deleteFriend });
                        })
                    })
                    .catch(err => {
                        {return reject( new Error(err))}
                    })
            }
        })
    }


    //Số lượng bạn bè
    static countFriend(userId)
    {
        return new Promise((resolve, reject)=>{
           UserModel.findById(userId)
            .then(user =>  {
                return resolve(user.friends.length);
            })
            .catch(err =>{return reject( new Error(err))})
        })
    }

    //DAnh sách yêu cầu kết bạn
    static receiveRequestFriend(userId)
    {
        return new Promise((resolve, reject)=>{
            const checkUserId = checkObjectId(UserModel, userId).catch(err => {return reject( new Error(err))});
            if(checkUserId)
            {
                User.findById(userId)
                .populate('receiveRequests')
                .then(user => {
                    return resolve(user)
                })
                .catch(err => {
                    return reject( new Error(err))
                });
            }
        })
    }
}

module.exports = {User, UserModel}
