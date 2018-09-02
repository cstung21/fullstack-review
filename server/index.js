const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js');


app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const user = req.body.term;

  console.log('Finding repos for:', user)
  console.log('Initiating request from server to GitHub API...');

  github.getReposByUsername(user, (err, response, repoData) => {
    if (err) {
      console.log('ERROR:', err);
      res.status(500).send('GitHub call unsuccessful')
    } else {
      console.log('Repo data received successfully from GitHub!');
      let repoList = JSON.parse(repoData);
      db.save(repoList, function(err, data) {
        if (err) {
          console.log('ERROR calling save function:', err);
        } else {
          console.log('Successfully called save function:', data)
        }
      }); 
      res.status(200).send('Repo Data loaded to database!');
    }
  }); 
});


app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('GET request received from client. Initiating call to database...');
  db.get(function(err, data) {
    if (err) {
      console.log('ERROR retrieving data from the database', err);
    } else {
      console.log('Successfully retrieved data from the database', data);
      res.status(200).send(data);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

