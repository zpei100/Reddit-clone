import gql from 'graphql-tag';

export const GET_POSTS = gql`
  {
    posts {
      user
      message
      title
      parent {
        postId
      }
      postId  
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!) {
    addUser(username: $username) {
      username
    }
  }
`
export const ADD_POST = gql`
  mutation AddPost($user: String!, $title: String!, $message: String!, $parent: Integer) {
    addPost(user: $user, title: $title, message: $message, parent: $parent) {
      user,
      title,
      message,
      parent
    }
  }
`