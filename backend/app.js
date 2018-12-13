const express = require('express');
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const Post = require("./models/post");

mongoose.connect('mongodb+srv://megaboty:2sbVjmvSi5CHAwYt@finalschoolproject-tjz1z.mongodb.net/node-angular?retryWrites=true')
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// only triggered for incoming post requests
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // automatically creates the right query to insert the right data into the db
  post.save().then(resultOfCreatedPost => {
    res.status(201).json({
      message: "Post added successfully!",
      postId: resultOfCreatedPost._id
    });
  });
});
//update existing resource is patch

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Updated Successful!"});
  });
});

//target this path "/apçi/posts" to reach some code
app.get('/api/posts', (req, res, next) => {
  //want to fetch data from posts collection
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: "posts fetched successfully!",
        posts: documents
    });
  });
});
// delete from database
app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!"});
  })
});
module.exports = app;
