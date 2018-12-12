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
        return Posts.find({user: parent.username})
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
        return Posts.find({parent: parent.postId});
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
      resolve: function(parent, args) {
        new Users({username: args.username}).save();
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
        return Users.find({});
      }
    },
    posts: {
      type: new GraphQLList(post),
      args: {
        username: { type: GraphQLString },
        parentId: { type: GraphQLString }
      },
      resolve: function(parent, args) {
        if (args.username) return Posts.find({username: args.username});
        if (args.parentId) return Posts.find({parent: args.parentId});
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