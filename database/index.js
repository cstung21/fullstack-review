const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'Database connected!'));


let repoSchema = new mongoose.Schema({
  id: { type: Number, unique: true}, 
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

let save = (repoList, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repoList.forEach(repo => {
    let newRepo = new Repo ({
      id: repo.id, 
      name: repo.name,
      owner: {
        login: repo.owner.login,
        id: repo.owner.id,
      },
      html_url: repo.html_url,
      description: repo.description,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      forks: repo.forks
    });
    newRepo.save(function(err, newRepo) {
      if (err) {
        callback(err);
      } else {
        callback(null, newRepo);
      }
    });
  });
};

let get = (callback) => {
  Repo.
  find().
  limit(25).
  sort({forks: -1}).
  select({
    'owner.login': 1, 
    name: 1, 
    description: 1, 
    html_url: 1,
    forks: 1,
    _id: 0.
  }).
  exec(callback);
}

module.exports.save = save;
module.exports.get = get;