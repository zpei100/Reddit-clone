const { Users, Posts } = require('./index');
const uuid = require('uuid/v1')

const text = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,  '

uuids = [ uuid(), uuid(), uuid(), uuid(), uuid(), uuid(), uuid(), uuid(),]

const fakeUsers = [
  {username: 'zen'},
  {username: 'mike'},
  {username: 'jake'}
]

const fakePosts = [
  {
    title: 'this is post number one from zen',
    parent: 'main', 
    user: 'zen',
    postId: uuids[0],
    message: text
  },
  {
    title: 'this is post number two from zen',
    user: 'zen',
    parent: 'main', 
    postId: uuids[1],
    message: text
  },
  {
    title: 'this is post number one from jake',
    user: 'jake',
    parent: 'main', 
    postId: uuids[2],
    message: text
  },
  {
    title: 'this is post number one from mike',
    user: 'mike',
    parent: 'main', 
    postId: uuids[3],
    message: text
  }
];

const fakeComments = [
  {
    parent: uuids[3],
    user: 'zen',
    title: 'this post sucks',
    postId: uuids[4],
    message: text
  },
  {
    parent: uuids[2],
    user: 'mike',
    title: 'this post is wonderful',
    postId: uuids[5],
    message: text
  },
  {
    parent: uuids[0],
    user: 'zen',
    title: 'this is my own post and I like it',
    postId: uuids[6],
    message: text
  },
  {
    parent: uuids[4],
    user: 'mike',
    title: 'your face sucks',
    postId: uuids[7],
    message: text
  }
]

fakeUsers.forEach(user => new Users(user).save());
fakePosts.forEach(post => new Posts(post).save());
fakeComments.forEach(post => new Posts(post).save());