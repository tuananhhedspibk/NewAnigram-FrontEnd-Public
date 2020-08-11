import gql from 'graphql-tag';

export default gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      message
      result
    }
  }
`;
