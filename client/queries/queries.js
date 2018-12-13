import gql from 'graphql-tag';

export const GET_POSTS = gql`
  query AllPosts($username: String, $parentId: String){
    posts(username: $username, parentId: $parentId) {
      user {
        username
      }
      message
      title
      parent {
        postId
      }
      postId  
    }
  }
`;

export const GET_POST = gql`
  query GetPost($postId: String) {
    post(postId: $postId) {
      user {
        username
      }
      message
      title
      parent {
        postId
      }
      postId
      comments {
        postId
        user {
          username
        }
        message
        title
        parent {
          postId
        }
      }
    }
  }
`

export const ADD_USER = gql`
  mutation AddUser($username: String!) {
    addUser(username: $username) {
      username
    }
  }
`
export const USER_POSTS = gql`
  query UserPosts($username: String!) {
    user(username: $username) {
      posts {
        postId,
        title,
        message,
        parent {
          postId
        }
        user {
          username
        }
      }
    }
  }
`

export const UPDATE_POST = gql`
  mutation UpdatePost($title: String!, $message: String!, $postId: String!) {
    updatePost(title: $title, message: $message, postId: $postId) {
      title
      message
    }
  }
`

export const ADD_POST = gql`
  mutation AddPost($title: String!, $message: String!, $user: String!, $parent: String!) {
    addPost(title: $title, message: $message, user: $user, parent: $parent) {
      title
      message
      user {
        username
      }
      parent {
        postId
      }
    }
  }
`