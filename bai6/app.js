const mongoose = require("mongoose");

mongoose.connect('mongodb://createuser:nguyentri1998@ds245772.mlab.com:45772/createuser', {useNewUrlParser: true, useCreateIndex: true});


const UserSchema = require("./models/user");
const User = mongoose.model('user', UserSchema);


const BlogSchema = require("./models/blog");
const Blog = mongoose.model('blog', BlogSchema);


//insert 1


// Blog.create({
//     title: 'Blog2',
//     author: '5c8cae7e5ffaa52c88821b82'
// })
// .then(blog => console.log(blog))
// .catch(error => console.log(error))


// insert 2
// User.insertMany(
//     [
//     {
//         username: 'admin6',
//         password: '123456',
//         gender: 'female'
//     },
//     {
//         username: 'admin8',
//         password: '123456',
//         gender: 'male'
//     },
//     {
//         username: 'admin7',
//         password: '123456',
//         gender: 'male'
//     }
// ])
// .then(user => console.log(user))
// .catch(error => console.log(error));




// User.findByIdAndDelete('5c8cae7e5ffaa52c88821b82')
// .then(o => console.log(o))
// .catch(error => console.log(error))


//select author from user join blog where blog.author = user.id


//Tim kiem theo id co lien ket

// select Blog.id, Blog.author, User.username from Blog join User where Blog.author = User.id
User.findById('5c8cb36f36be1619d81889c4')
.then(r => Blog.find({author: r._id}, {author: 1, _id: 0})
               .then(result => console.log(r.username + '-' + result)))
.catch(error => console.log(error))



// User.find({}, {id: 1, username: 1})
// .then(r => console.log(r))
// .catch(error => console.log(error))

// {dau tien} : dieu kien , {thu 2} : cot can lay
// => select username from User 
// User.find({}, {username: 1, _id : 0})
// .then(result => console.log(result))
// .catch(error => console.log(error));


// => select username from User where username = "admin2"
// User.findOne({username: "admin2"}, {username: 1, _id : 0})
// .then(result => console.log(result))
// .catch(error => console.log(error));


//Find id
// User.findById('5c8cb36f36be1619d81889c6')
// .then(result => console.log(result))
// .catch(error => console.log(error));


//in.. Bat dau bang admin
// User.find({
//     username: { $regex: /^admin/}
// })
// .then(result => console.log(result))
// .catch(error => console.log(error));


//Ket thuc bang admin
// User.find({
//     username: { $regex: /admin8$/}
// }, {username: 1, _id: 0})
// .then(result => console.log(result))
// .catch(error => console.log(error));



//Bieu thuc so sanh trong dabase


// User.find({
//     price: { $gte: 12} //>=
// }, {username: 1, _id: 0})
// .then(result => console.log(result))
// .catch(error => console.log(error));



//IN

// User.find({
//     _id: { $in : ["5c8cb36f36be1619d81889c6", "5c8cb4452bbbcc2e38054a25"]}
// }, {username: 1, _id: 0})
// .then(result => console.log(result))
// .catch(error => console.log(error));


// //order by asc:  1 ... desc : -1
// User.find().sort({username: -1})
// .then(result => console.log(result))
// .catch(error => console.log(error));


//count: .countDocuments()

//limit... Lay 3 nguoi tu vi tri thu 3 tro di
// User.find().limit(4).skip(3)
// .then(result => console.log(result))
// .catch(error => console.log(error));


//update by id
// User.findByIdAndUpdate('5c8cb4452bbbcc2e38054a25', {gender: 'female'})
// .then(result => console.log(result))
// .catch(error => console.log(error));



// update by one
// User.findOneAndUpdate({username: "admin2"}, {gender: 'female'})
// .then(result => console.log(result))
// .catch(error => console.log(error));



//update many
// User.find({
//     username: {
//         $regex: /admin/
//     }
// })
// .updateMany({password: '123987'})
// .then(result => console.log(result))
// .catch(error => console.log(error));



