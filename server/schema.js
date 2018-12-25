const { Users, Posts } = require('../database/index');
const uuid = require('uuid/v4')

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID
} = require('graphql');

const user = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    username: { type: GraphQLString },
    posts: { 
      type: new GraphQLList(post),
      resolve: function(parent) {
        return Posts.find({user: parent.username}).sort({updatedAt: -1})
      }  
    }
  })
})

const post = new GraphQLObjectType({
  name: 'posts',
  fields: () => ({
    postId: { type: GraphQLString },
    user: {
      type: user,
      resolve: function(parent) {
        return Users.findOne({username: parent.user})
      }
    },
    message: { type: GraphQLString },
    title: { type: GraphQLString },
    parent: { 
      type: post,
      resolve: function(parent) {
        return Posts.findOne({postId: parent.parent})
      }
    },
    comments: {
      type: new GraphQLList(post),
      resolve: function(parent, args) {
        return Posts.find({parent: parent.postId}).sort({updatedAt: -1});
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: user,
      args: { 
        username: { type: GraphQLString }
      },
      resolve: function(parent, args, {req}) {
        return new Users({username: args.username}).save().then(user => {
          req.session.username = user.username;
          req.session.save();
          return user;
        }).catch(e => {
          if (e.code === 11000) return null;
        });
      }
    },
    login: {
      type: user,
      args: {
        username: { type: GraphQLString }
      },
      resolve: function(parent, args, {req}) {
        return Users.findOne({username: args.username}).then(user => {
          req.session.username = user.username;
          req.session.save();
          return user;
        }).catch(e => {
          if(e.code === 11000) return null;
        })
      }
    },
    addPost: {
      type: post,
      args: {
        title: { type: GraphQLString },
        message: { type: GraphQLString },
        user: { type: GraphQLString },
        parent: { type: GraphQLString }
      },
      resolve: function(P, {title, message, user,  parent}) {
        new Posts({title, message, user, postId: uuid(), parent}).save()
      }
    },
    updatePost: {
      type: post,
      args: {
        title: { type: GraphQLString },
        message: { type: GraphQLString },
        postId: { type: GraphQLString }
      },
      resolve: function(P, {title, message, postId}) {
        return Posts.findOneAndUpdate({postId}, { $set: {title, message, postId}}, {new: true})
      }
    },
    deletePost: {
      type: post,
      args: {
        postId: { type: GraphQLString }
      },
      resolve: function(P, {postId}) {
        return Posts.findOneAndRemove({postId})
      }
    }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: {
    users: {
      type: new GraphQLList(user),
      resolve: () => {
        return Users.find({}).sort({createdAt: -1});
      }
    },
    posts: {
      type: new GraphQLList(post),
      args: {
        username: { type: GraphQLString },
        parentId: { type: GraphQLString }
      },
      resolve: function(parent, args) {
        if (args.username) return Posts.find({username: args.username}).sort({updatedAt: -1});
        if (args.parentId) return Posts.find({parent: args.parentId}).sort({updatedAt: -1});
        return Posts.find({});
      }
    },
    user: {
      type: user,
      args: {
        username: { type: GraphQLString }
      },
      resolve: function(parent, {username}) {
        return Users.findOne({username})
      }
    },
    post: {
      type: post,
      args: { 
        postId: { type: GraphQLString }
      },
      resolve: function(parent, {postId}) {
        return Posts.findOne({postId})
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

module.exports = schema;