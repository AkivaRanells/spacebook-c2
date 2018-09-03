var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
const myRoutes = require('./router')
const SERVER_PORT = 8080;

mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel');
var Comment = require('./models/postModel');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', myRoutes);

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   console.log(req.file);
//   // req.body will hold the text fields, if there were any
//   res.send("it worked");
// })

var debug = require('debug')('myapp');
debug('hello from the debugger');
var debug2 = require('debug')('myapp:two');
var debug3 = require('debug')('myapp:three');
var debug4 = require('debug')('myapp:4');

debug2('what\'s up from two')
debug3('yo from 3');
debug4('hi from 4');
// //Function used to configure the middleware storage
// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, '/tmp/uploads');
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// //Function used to filter the files that are uploaded
// var fileFilter = function(req, file, cb) {
//   if (file.originalname.indexOf('jpg') > 0) {
//     cb(null, true)
//   } else
//     cb(new Error('Please only upload ".jpg" files.'))
// }

// function readFile (req, function(err, data)){}
// //IMPORTANT NOTE:
// //Inside the fileFilter, destination and filename functions 'req.body' may not be populated yet.
// //It depends on the order that the client transmits fields and files to the server.

// //Create the middleware function
// var uploader = multer({
//   storage: storage,
//   fileFilter: fileFilter
// }).single('jpgFile')

// //finally here is the post route that uses the middleware we just created
// app.post('/upload', uploader, function(req, res) {
//   if (!req.file) {
//     return (new Error("Please select jpg file to upload."));
//   }
//   //now the file is on our server, we can do something with it
//   //we have assumed that this function is defined elsewhere
//   readFile(req.file.path, function(err, data) {
//     //do something with data...
//     return res.send(data) //...or in this case, just send it back!
//   });
// });

// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
// 2) to handle adding a post
// 3) to handle deleting a post
// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post

app.listen(process.env.PORT || SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
