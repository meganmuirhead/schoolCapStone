let express = require('express');
path = require('path');
const app = express();
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';

// let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Issue = new Schema({
  title:{
    type: String
  },
  responsible:{
    type: String
  },
  severity:{
    type: String
  },
  status:{
    type: String,
    default: 'Open'
  }
});

// let Issue = require('./models/Issue');

// getting port this way
port = process.env.PORT || process.argv[2] || 8080;

// // using app.use to use static files in my public
// // folder for the root level of the site
// app.use('/', express.static('src'));
// app.get('/', (req, res) => res.send('Hello World'));
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/issues');
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB DB connection established successfully!');
});

router.route('/issues').get((req, res) => {
  Issue.find((err, issues) => {
    if (err)
      console.log(err);
    else
      res.json(issues);
  })
});

router.route('/issues/:id').get((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err)
      console.log(err);
    else
      res.json(issue);
  })
});

router.route('/issues/add').post((req, res) => {
  let issue = new Issue(req.body);
  issue.save()
    .then(issue => {
      res.status(200).js({'issue': 'Added successfully'});
    }).
  catch(err => {
    res.status(400).send('Failed to create a new record!');
  });
});

router.route('/issues/update/:id').post((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (!issue)
      return next(new Error('Could not load document'));
    else {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;

      issue.save().then(issue => {
        res.json('Update done');
      }).catch(err => {
        res.status(400).send('Update failed!');
      });
    }
  });
});

router.route('/issues/delete/:id').get((req, res) => {
  Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
    if (err)
      res.json(err);
    else
      res.json('Removed Successfully!');
  });
});

app.use('/', router);


app.listen(port, function () {

  console.log('app up on port: ' + port);

});
