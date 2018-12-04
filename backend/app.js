const express = require('express');
const app = express();


//target this path "/api/posts" to reach some code
app.use('/api/posts', (req, res, next) => {
  // res.send('Hello from express');
  const posts = [
    {
      id: '3o23jfa',
      title: 'First server-side post',
      content: 'this is coming from the server'
    },
    {
      id: 'dod23jfadadfa',
      title: 'Second server-side post',
      content: 'this is coming from the server!'
    }
  ];
  res.json();
});


module.exports = app;
