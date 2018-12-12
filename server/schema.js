const { Users, Posts } = require('../database/index');

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
});

const post = new GraphQLObjectType({
  name: 'posts',
  fields: () => ({
    postId: { type: GraphQLID },
    user: { type: GraphQLString },
    userObject: {
      type: user,
      args: {
        username: { type: GraphQLString }
      },
      resolve: function(parent, {username}) {
        return Users.findOne({username})
      }
    },
    message: { type: GraphQLString },
    title: { type: GraphQLString },
    parent: { 
      type: post,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: function(parent, {id}) {
        return Posts.findOne({id})
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
        postId: { type: GraphQLID },
        parent: { type: GraphQLInt }
      },
      resolve: function(P, {title, message, user, postId, parent}) {
        new Posts({title, message, user, postId, parent}).save()
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
        username: { type: GraphQLString }
      },
      resolve: function(parent, args) {
        if (args) return Posts.find({username: args.username})
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
    }
  }
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

module.exports = schema;