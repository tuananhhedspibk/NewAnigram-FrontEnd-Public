import gql from 'graphql-tag';

export default gql`
  mutation UnlikePost($postId: ID!) {
    unlikePost(postId: $postId) {
      message
      result
    }
  }
`;
