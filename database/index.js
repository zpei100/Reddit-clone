const db = require('mongoose');

db.connect('mongodb://zen:password2@ds157712.mlab.com:57712/reddis-clone', {useNewUrlParser: true});

var Schema = db.Schema;

var usersSchema = new Schema({
  username: {
    type: String,
    unique: true
  } 
});

var postsSchema = new Schema({
  postId: Number,
  message: String,
  parent: Number,
  user: String,
  title: String
});

const Users = db.model('users', usersSchema);
const Posts = db.model('posts', postsSchema);

module.exports = {Users, Posts};