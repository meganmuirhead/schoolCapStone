const express = require('express');
const bodyParser = require("body-parser");

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added successfully!"
  });
});
//target this path "/api/posts" to reach some code
app.get('/api/posts', (req, res, next) => {
  // res.send('Hello from express');
  const posts = [
    {
      id: "3o23jfa",
      title: "First server-side post",
      content: "this is coming from the server"
    },
    {
      id: "dod23jfadadfa",
      title: "Second server-side post",
      content: "this is coming from the server!"
    }
  ];
  res.status(200).json({
    message: "posts fetched successfully!",
    posts: posts
  });
});


module.exports = app;
