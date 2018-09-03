const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
// mongoose.Promise = require('bluebird'); 


mongoose.connect('mongodb://localhost/spacebookDB', function () {
    console.log("DB connection established!!!");
});


const Post = require('./models/postModel');


// let testPost = new Post({
//     text: "TEST",
//     comments: []
// });

// testPost.comments.push({text: "?", user:"me"});
// testPost.save();

// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
router.get('/posts', function (req, res) {
    Post.find({}, function (err, result) {
        if (err) return err;
        res.send(result);
    })
});

// 2) to handle adding a post
router.post('/posts', function (req, res) {
    // console.log(req.body);
    let thisPost = new Post(req.body);
    thisPost.save();
    // console.log(thisPost);

    res.send(thisPost);
})

// router.post('/add', upload.single('imagename'), function(req, res, next) {
//     var image = req.file.filename;
//    /** rest */ 
// });

// 3) to handle deleting a post
router.delete('/posts/:id', function(req, res){
    // let id  = "ObjectId(\""+req.params.id+"\")";
    let idDelete = req.params.id
    // console.log(idDelete);
    Post.remove({_id: idDelete}, function(err){
        if (err) throw err;
    });
    res.send(idDelete);
})
// 4) to handle adding a comment to a post
router.post('/comments', function (req, res) {
    //  console.log(req.body);
    let thePostId = req.body.id;
    let theComment = {text: req.body.text, user: req.body.user};
    let commentFromDB = {}
    // console.log(theComment);
    Post.findOneAndUpdate(thePostId, 
        {$push:
            {comments: theComment}
        }, {new: true})
        .then((post)=>{
            // console.log(post.comments[post.comments.length-1])
            commentFromDB = post.comments[post.comments.length-1];
            res.send(commentFromDB);
        })
        .catch((err)=>{console.log(err)})
    
})
// 5) to handle deleting a comment from a post
router.delete('/comments/:postId/:commentId', function(req, res, err){
    if(err) console.log(err);
    console.log(req.params.postId+" "+req.params.commentId);
    Post.findOneAndUpdate(req.params.postId, 
    {$pull:
        {"comments":{_id:req.params.commentId}}})
        .exec((err, res)=>{
            if(err)console.log(err);
            console.log(res);
    })
    res.send("nada");
})
module.exports = router;

