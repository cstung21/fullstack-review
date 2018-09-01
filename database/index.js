const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'Database connected!'));


let repoSchema = new mongoose.Schema({
  id: Number,
  name: String,
  owner: {
    login: String,
    id: Number,
  },
  html_url: String,
  description: String,
  created_at: Date,
  updated_at: Date,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;