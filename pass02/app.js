const db = require('./lib/connectdb')
const { hash } = require('./lib/bcrypt')
const User = require('./models/User')
const Post = require('./models/Post')
const Comment = require('./models/Comment')

//4.15
User.findById('5c9f54890058711ae878ad1d')
.populate({
    path: 'posts'
})
.then(r => {
    r.posts.forEach(data => {
        let count = data.likes.length;
        // console.log(count);
        
        Post.find({_id: data._id,
            count: {
                $lt: 2
            }
        })
        .then(result => console.log(result))
    })
})
.catch(e => console.log(e))

// 4.14
// Post.findOneAndUpdate({_id: '5c9f54a708f07f1aec4d78ed'}, {
//     $set : {
//         content : 'Nội dung cho status 01 của user 1 part 2'
//     }
// }, {new: true})
// .then(result => console.log(result))
// .catch(err => console.log(err))





//4.13
// Post.findById('5c9f54a708f07f1aec4d78ed',{content:1,_id:0})
// .populate({
//     path: 'comments', // prop of post
//     populate: {
//         path: 'author', // prop of comment
//         select: {name:1,_id:0},
//         match:{ email: 'admin@gmail.com'}
//     },
//     match: {
//         author: {
//             $ne : null  //not exist
//         }
//     }
// })
// .then(post=>{
//     const comment = post.comments[0]
//     // return console.log(comment)
//     if(comment.author!=null) 
//         console.log(comment.likes.length)
//     else console.log(new Error('not found!'))
// })



//4.12
// Post.findById('5c9f54a708f07f1aec4d78ed', {content: 1, _id: 0})
// .populate({
//     path: 'comments', //of post
//     select: {content: 1, _id: 0},
//     populate: {
//         path: 'author' //of comment
//     }
// })
// .populate({
//     path: 'author', 
//     select: {name: 1, _id: 0, email: 1}
// })
// .then(post => {
//     console.log(`Post: ${post.content}
//                  Author: ${post.author.name}
//                  Comments: ` );

//     post.comments.forEach(cmt =>{
//         console.log(`Name: ${cmt.author.name} : ${cmt.content}`)
//     })
// })
// .catch(e => console.log(e))



//4.11 liet ke y/c kb 
// User.findOne({email: 'admin2@gmail.com'})
// .populate('receiveRequests')
// .then(result => {
//     console.log(result)
// })
// .catch(err => console.log(err))




//4.10 So luong ban be
// User.findOne({email: 'admin@gmail.com'})
// .then(user =>  user.friends.length)
// .then(result => {
//     console.log(result)
// })
// .catch(err => console.log(err))



//4.9 liet ke post 
//Cach1
// User.findOne({email: 'admin2@gmail.com'})
// .then(user => Post.find({author: user._id}))
// .then(result => {
//     console.log(result)
// })
// .catch(err => console.log(err))


//Cach2
// User.findOne({email: 'admin2@gmail.com'}, {email: 1, _id: 0})
// .select(['name', 'password'])
// .populate('posts', {content: 1, _id: 1})
// .then(user => console.log(user))
// .catch(e => console.log(e))




////4.8.2 Hủy bạn bè
// User.findOne({email: 'admin@gmail.com'})
// .then(userFinishFriends)
// User.findOneAndUpdate({email: 'admin3@gmail.com'},{
//     $pull: {
//         friends: userNotAccept._id
//     }
// })
// .then(userRejectFriends => {
//     return User.findOneAndUpdate({email: 'admin@gmail.com'}, {
//         $pull : {
//             friends: userReject._id
//         }
//     },{new:true})
// })
// .then(r=>console.log(r))
// .catch(err=>console.log(err))


//Huy loi moi ket ban
//4.8.1 Tim kiem user 2 huy ket ban sau do cap nhat lai receiveRequests 
// User.findOne({email: 'admin2@gmail.com'})
// .then(userNotAccept)
// User.findOneAndUpdate({email: 'admin@gmail.com'},{
//     $pull: {
//         receiveRequests: userNotAccept._id
//     }
// })
// .then(userReject => {
//     return User.findOneAndUpdate({email: 'admin2@gmail.com'}, {
//         $pull : {
//             sendRequests: userReject._id
//         }
//     },{new:true})
// })
// .then(r=>console.log(r))
// .catch(err=>console.log(err))





//4.7   Tim kiem user 2 chap nhan ket ban sau do update lai friends cua user 2 va xoa loi gui cua user 1
// User.findOne({email: 'admin3@gmail.com'})
// //A accept B
// .then(userSend => {
//     User.findOneAndUpdate({email: 'admin@gmail.com'}, {
//         $addToSet: {
//             friends: userSend._id
//         },
//         $pull: {
//             receiveRequests: userSend._id
//         }
//     })
// })
// .then(userAccept => {
//     //set friends for B
//     // console.log(user._id);
//     return User.findOneAndUpdate({email: 'admin3@gmail.com'}, {
//         $addToSet: {
//             friends: userAccept._id
//         },
//         $pull: {
//             sendRequests: userAccept._id
//         }
//     },{new:true})
//     })
// .then(r=>console.log(r))
// .catch(err=>console.log(err))





//4.6
// User.findOneAndUpdate({_id:'5c9f53672fe52a1cdc12a721'},{
//         $addToSet:{
//             sendRequests: '5c9f535014ade631d4fc7ce3'
//         }
//     })
//     .then((userSendRequest)=>{
//         return User.findOneAndUpdate({_id:'5c9f535014ade631d4fc7ce3'},{
//             $addToSet:{
//                 receiveRequests: userSendRequest
//             }
//         },{new:true})
//     })
//     .then(r=>console.log(r))
//     .catch(err=>console.log(err))



//4.5: Dislike
// User.findOne({email:'admin2@gmail.com'})
// .then(user=>{
//     //update post : likes
//     return Post.findByIdAndUpdate('5c9f5512d85678291c1b0994',{
//         $pull:{
//             likes: user._id
//         }
//     },{new:true})
// })
// .then(r=>console.log(r))
// .catch(err=>console.log(err))





//4.4  Like bai viet
// User.findOne({email:'admin2@gmail.com'})
// .then(user=>{
//     //update post : likes
//     return Post.findByIdAndUpdate('5c9f5512d85678291c1b0994',{
//         $addToSet:{
//             likes: user
//         }
//     },{new:true})
// })
// .then(r=>console.log(r))
// .catch(err=>console.log(err))




//4.3
// Comment.create({
//     author: '5c9f54890058711ae878ad1d',
//     post: '5c9f54b0188c391f80eaa7f9',
//     content: 'User 1 comment tren post 2'
// })
// .then((comment)=>{
//     return Post.findByIdAndUpdate('5c9f54b0188c391f80eaa7f9',{
//         $addToSet:{
//             comments: comment._id
//         }
//     },{new:true})
// })
// .then(r=>console.log(r))
// .catch(err=>console.log(err))





//4.2
// Post.create({
//     author: '5c9f535014ade631d4fc7ce3',
//     content: 'Nội dung cho status 03 của user 2',
// }).then(post=>{
//     User.findOneAndUpdate({
//             _id:'5c9f535014ade631d4fc7ce3'
//         },{
//             $addToSet: {
//                 posts: post._id
//             }
//         },{
//             new:true
//         })
//         .then(result=>console.log(result))
//         .catch(err=>console.log(err))
// })





//4.1
// hash('123456')
// .then(passworsHash=>{
//     User.create([
//         {
//             email:'admin@gmail.com',
//             password: passworsHash,
//             name: 'Admin'
//         }
//     ])
//     .then(result => console.log(result))
//     .catch(e => console.log(e))
// })

