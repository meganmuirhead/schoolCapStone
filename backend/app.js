const express = require('express');
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const Post = require("./models/post");

mongoose.connect('mongodb+srv://megaboty:s02FazbMz5V9AERVpo@finalschoolproject-tjz1z.mongodb.net/node-angular?retryWrites=true')
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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"
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
  post.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Post added successfully!",
      postId: resultOfCreatedPost._id
    });
  });
  console.log(post);

});
//target this path "/api/posts" to reach some code
app.get('/api/posts', (req, res, next) => {
  // res.send('Hello from express');
  // s02FazbMz5V9AERVpo
  // const posts = [
  //   {
  //     id: "3o23jfa",
  //     title: "First server-side post",
  //     content: "this is coming from the server"
  //   },
  //   {
  //     id: "dod23jfadadfa",
  //     title: "Second server-side post",
  //     content: "this is coming from the server!"
  //   }
  // ];
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
