const { Users, Posts } = require('./index');

const text = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'

const fakeUsers = [
  {username: 'zen'},
  {username: 'mike'},
  {username: 'jake'}
]

const fakePosts = [
  {
    title: 'this is post number one from zen',
    parent: null,
    user: 'zen',
    postId: 1,
    message: text
  },
  {
    title: 'this is post number two from zen',
    user: 'zen',
    parent: null,
    postId: 2,
    message: text
  },
  {
    title: 'this is post number one from jake',
    user: 'jake',
    parent: null,
    postId: 3,
    message: text
  },
  {
    title: 'this is post number one from mike',
    user: 'mike',
    parent: null,
    postId: 4,
    message: text
  }
];

const fakeComments = [
  {
    parent: 4,
    user: 'zen',
    title: 'this post sucks',
    postId: 5,
    message: text
  },
  {
    parent: 3,
    user: 'mike',
    title: 'this post is wonderful',
    postId: 6,
    message: text
  },
  {
    parent: 1,
    user: 'zen',
    title: 'this is my own post and I like it',
    postId: 7,
    message: text
  },
  {
    parent: 5,
    user: 'mike',
    title: 'your face sucks',
    postId: 8,
    message: text
  }
]

fakeUsers.forEach(user => new Users(user).save());
fakePosts.forEach(post => new Posts(post).save());
fakeComments.forEach(post => new Posts(post).save());